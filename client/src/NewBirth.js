import React from "react";
import { useState } from "react";
import axios from "axios";
// import { nanoid } from "nanoid";

const NewBirth = ({ people, setPeople, refetchFlag, setRefetchFlag}) => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newReminder, setReminder] = useState(false);


  const newAnniversary = (e) => {
    e.preventDefault();

    // if (!newName || !newAge || !newUrl) {
    //   alert("Please fill in all the boxes");
    //   return;
    // }

    setPeople([
      ...people,
      { name: newName, age: newAge, url: newUrl, reminder: newReminder },
    ]);

    axios
      .post("http://localhost:8000/birthday", {
        name: newName,
        age: newAge,
        url: newUrl,
        reminder: newReminder
      })
      .then(function (response) {
        console.log(response);
      })
      .then(function () {
        setRefetchFlag(!refetchFlag);
      })
      .catch(function (error) {
        console.log(error);
      });

    setNewName("");
    setNewAge("");
    setNewUrl("");
    setReminder("")
  };

  return (
    <form className="add-form" onSubmit={(event) => newAnniversary(event)}>
      <div className="form-control">
        <label>Add a name</label>
        <input
          type="text"
          placeholder="e.g. Elodie"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label>Add the age</label>
        <input
          type="text"
          placeholder="e.g. 33"
          value={newAge}
          onChange={(e) => setNewAge(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="form-control">
        <label for="img">Paste your avatar in url format:</label>
        <input
          type="text"
          id="img"
          placeholder="copy an image address"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />
      </div>
      <div className="form-control form-control-check">
        <label>Important</label>
        <input
          className="reminder"
          type="checkbox"
          checked={newReminder}
           value={newReminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}

        />
      </div>

      <input type="submit" value="Save Birthday" className="btn btn-block"/>
    </form>
  );
};

export default NewBirth;
