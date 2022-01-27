import { useState} from "react";
import "./App.css";
import axios from "axios";
import { useQuery } from "react-query";
import { useMutation } from 'react-query'
import Spinner from "./Spinner";


import List from "./List";
import NewBirth from "./NewBirth";

function App() {
  const [people, setPeople] = useState([]);
  const [refetchFlag, setRefetchFlag] = useState(false);
  

  //Implemented React Query and Axios to make a get request to the Rest API

  const client = axios.create({
    baseURL: "/api/birthday"
  });

  const { isSuccess, data: axiosRes, refetch } = useQuery(
    "birthday data", //unique key
    () => client.get(),
    {
      enabled: true
    }
  )

  
  //Implemented UseMutation and Axios to make a patch request to the Rest API || TOGGLE REMINDER

  const modifyBirthdayMutation = useMutation(async (dataObject) => {
    console.log(dataObject);
    return await client.patch(`/${dataObject.id}`, { reminder: dataObject.currentReminderValue === 1 ? 0 : 1 })
  })

  const toggleReminderHandler = async (id, currentReminderValue) => {
    await modifyBirthdayMutation.mutateAsync({ id, currentReminderValue });
    await refetch()
  }

 //REFETCH FUNCTION

  // const refetchBirthdays = () => {
  //   setRefetchFlag(!refetchFlag);
  // };

  return (
    <main>
      <section className="container">
        {isSuccess
          ? <NewBirth
            people={axiosRes.data}
            refetchBirthdays={refetch}
          />
          : <Spinner />
        }
        <h3>{isSuccess ? `${axiosRes.data.length} birthdays today` : "loading..."}</h3>
        {isSuccess &&
          <List
            refetchBirthdays={refetch}
            people={axiosRes.data}
            toggleReminderHandler={toggleReminderHandler}
          />
        }
        <button onClick={() => setPeople([])}>Clear all</button>
      </section>
    </main>
  );
}


export default App;
