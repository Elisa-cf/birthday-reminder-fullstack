import { FaTimes } from "react-icons/fa";
import axios from "axios";

const List = ({ people, onToggle, refetchBirthdays }) => {
  

  const client = axios.create({
    baseURL: "http://localhost:8000/birthday"
  });
  async function deleteBirthday(id) {
    try { 
      await client.delete(`http://localhost:8000/birthday/${id}`);
      // alert("Birthday deleted!");
      await refetchBirthdays();   
    } catch (error) {
    console.error(error);
  }
}

   // ***
    


  //  function deleteBirthday(id) {
  //    axios.delete(`http://localhost:8000/birthday/${id}`)
  //      .then(() => refetchBirthdays({ status: 'Delete successful' }));
  // }

 

  return (
    <>
      {people.map((person, id) => (
        <article
          key={id}
          className={`person ${person.reminder ? "reminder" : ""}`}
          onDoubleClick={() => onToggle(person.id) }
        >
      
          {/* but default class person but if the person.reminder is true then we gonna have the class of reminder, else nothing. */}
          <img src={person.url} alt={person.name} />
          <div>
            <h4>
              {person.name}
              <FaTimes
                style={{
                  color: "#1AA179",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={() => deleteBirthday(person.id)}
              />
            </h4>
            <p>{person.age} years</p>
          </div>
        </article>
      ))}
    </>
  );
};

// const List = ({people, onToggle}) => {
//     return (
//        <>

//       {people.map((person, id) =>  <article key={id} className="person">
//         <img src={person.image} alt={person.name}/><div>
//           <h4>{person.name}</h4>
//           <p>{person.age} years</p>
//         </div>
//       </article>
//      )
//       }
//     </>
//     )
// }

//

export default List;
