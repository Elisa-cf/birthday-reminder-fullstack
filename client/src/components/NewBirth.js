import React from "react";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";

const NewBirth = ({ refetchBirthdays }) => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newUrl, setNewUrl] = useState("https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090");
  const [newReminder, setReminder] = useState(false);


  //Implemented useMutation and Axios to make a get request to the Rest API

  const client = axios.create({
    baseURL: "/api/birthday"
  });

  const createNewBirthMutation = useMutation(async () => await client.post("/", {
    name: newName,
    age: newAge,
    url: newUrl,
    reminder: newReminder ? 1 : 0
  }))

  const newAnniversaryHandler = async (e) => {
    e.preventDefault();

    if (newUrl === "") {
      alert("You must upload an image")
      return
    }

    await createNewBirthMutation.mutateAsync();
    setNewName("");
    setNewAge("");
    setNewUrl("");
    setReminder("")
    await refetchBirthdays();
  }


  //handling images with cloudinary in react (script in index.html in public folder)

  const handleUpload = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dcpeaminc', 
        uploadPreset: 'kixqt1da',
      },
      (error, result) => {
        if (result.event === 'success') {
          console.log(result);
          setNewUrl(result.info.secure_url);
        }
      },
    );
    widget.open(); // open up the widget after creation
  }


  return (
    <form className="add-form" onSubmit={(event) => newAnniversaryHandler(event)}>
      <div className="form-control">
        <label htmlFor="name">Add a name</label>
        <input
          id="name"
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
        {/*<label for="img">Upload an image:</label>
        <input
          type="file"
          name="myfile"
          id="img"
          placeholder="copy an image address"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />*/}
        <button onClick={handleUpload}>Upload an image</button>
      </div>
      {/* <div className="form-control">
        <label for="img">Paste your avatar in url format:</label>
        <input
          type="text"
          id="img"
          placeholder="copy an image address"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />
      </div> */}
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

      <input type="submit" value="Save Birthday" className="btn btn-block" />
    </form>
  );
};

export default NewBirth;
