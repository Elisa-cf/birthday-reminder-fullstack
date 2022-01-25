import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useMutation } from 'react-query'

const List = ({ people, toggleReminderHandler, refetchBirthdays }) => {


  
  //Implemented useMutation and Axios to make a delete request to the Rest API

  const client = axios.create({
    baseURL: "/api/birthday"
  });

  const removeItemMutation = useMutation(async (id) => await client.delete(`/${id}`))

  async function deleteBirthdayHandler(id) {
    await removeItemMutation.mutateAsync(id);
    await refetchBirthdays();
  }

  return (
    <>
      {people.map((person, id) => (
        <article
          key={id}
          className={`person ${person.reminder ? "reminder" : ""}`}
          onDoubleClick={() => toggleReminderHandler(person.id, person.reminder)}
        >
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

                onClick={() => deleteBirthdayHandler(person.id)}
              />
            </h4>
            <p>{person.age} years</p>
          </div>
        </article>
      ))}
    </>
  );
};

export default List;
