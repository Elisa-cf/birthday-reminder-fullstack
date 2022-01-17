//https://github.com/carlosaore/chained-queries-template/blob/main/src/SimpleQuery.js#L9
//https://react-query.tanstack.com/reference/useMutation 
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
// import { useQuery } from "react-query";
import Spinner from "./Spinner";

// import data from './data';
import List from "./List";
import NewBirth from "./NewBirth";

function App() {
  const [people, setPeople] = useState([]);
  const [refetchFlag, setRefetchFlag] = useState(false);
  
  // to add the data: useState(data + import component)

  // const client = axios.create({
  //   baseURL: "http://localhost:8000/birthday"
  // });

  // const { isSuccess, data: axiosRes, refetch } = useQuery(
  //   // key osea el nombre
  //   "birthday data",
  //   () => client.get(),
  //   {
  //     enabled: true
  //   }
  // )
  // data {taco: "carnitas"}  data.taco === "carnitas"
  // if api is loading: data === undefined por tanto data.taco eso es undefined.taco pero si hacemos undefined?.taco === undefined en lugar de error

  //toggle reminder

  const toggleReminder = (id) => {
    setPeople(
      people.map((person) =>
        person.id === id ? { ...person, reminder : !person.reminder } : person
      )
    );
  };
  //{... person, reminder: ! person.reminder} = set up the reminder of the full person properties (...person) to the opposite of what it is normally (if it is false to true
  //and if it true to false). Normally is false so it will be true.

  // delete a birthday
  const deleteBirthday = (id) => {
    setPeople(people.filter((person) => person.id !== id));
  };


  const refetchBirthdays = () => {
    setRefetchFlag(!refetchFlag);
  };

  // const url = "http://localhost:8000/birthday";

  // useEffect(() => {
  //   const source = axios.CancelToken.source();
  //   axios
  //     .get(url, {
  //       cancelToken: source.token,
  //     })
  //     .then((res) => res.data)
  //     .then((data) => setPeople(data)) // Replace "setState" with the name of your setState function
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   return () => {
  //     source.cancel("Component got unmounted");
  //   };
  // }, [refetchFlag]);


  const client = axios.create({
    baseURL: "http://localhost:8000/birthday"
  });

    useEffect(() => {
    const getBirthday = async () => {

      try {
        const response = await client.get();
        setPeople(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getBirthday();
  }, [refetchFlag])

  return (
    <main>
      <section className="container">
        {/* {isSuccess */}
         {people ? <NewBirth
            // people={axiosRes.data}
          // refetchBirthdays={refetch}
            people={people}
            setPeople={setPeople}
            refetchFlag={refetchFlag}
            setRefetchFlag={setRefetchFlag}
       
        
           
          />
          : <Spinner />}
          {/* } */}
        {/* <h3>{isSuccess ? `${axiosRes.data.length} birthdays today` : "loading..."}</h3> */}
        <h3>{people.length} birthdays today</h3>
        {/* {isSuccess &&  */}
        <List
          // refetchBirthdays={refetch}
          // people={axiosRes.data}
          refetchBirthdays={refetchBirthdays}
          people={people}
          onToggle={toggleReminder}
          onDelete={deleteBirthday}
        />
        {/* } */}
        <button onClick={() => setPeople([])}>Clear all</button>
      </section>
    </main>
  );
}

export default App;
