import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMutation } from 'react-query'
import Spinner from "./Spinner";
import List from "./components/List";
import NewBirth from "./components/NewBirth";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Navbar2 from "./components/Navbar2";

function App() {
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);

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


  return (
    <>
      <Navbar/> 
      {/* <Navbar2/> */}
      <main>
        {isSuccess
          ? <section className="container" >
              <Header onAdd={() => setShowBirthdayForm(prevValue => !prevValue)} showAdd={showBirthdayForm}/>
              {showBirthdayForm && isSuccess  &&
                <NewBirth
                  people={axiosRes.data}
                  refetchBirthdays={refetch}
                />
              }
                <h3>
                  {isSuccess && `${axiosRes.data.length} birthdays today`}
                </h3>
                {isSuccess &&
                  <List
                    refetchBirthdays={refetch}
                    people={axiosRes.data}
                    toggleReminderHandler={toggleReminderHandler}
                  />
                }
            </section>
          : <section className="container" >
              <Header onAdd={() => setShowBirthdayForm(prevValue => !prevValue)} showAdd={showBirthdayForm} />
              {showBirthdayForm && <NewBirth />}
            </section>
        }
      </main>
      <Footer />
    </>
  )
}


export default App;
