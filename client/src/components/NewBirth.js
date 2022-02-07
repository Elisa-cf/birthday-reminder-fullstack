import React from "react";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import styled from 'styled-components'

const NewBirth = ({ refetchBirthdays }) => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newUrl, setNewUrl] = useState("https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090");
  const [newReminder, setReminder] = useState(false);


  //Implemented useMutation and Axios to make a get request to the Rest API

  const client = axios.create({
    baseURL: "/api/birthday"
  });

  const createNewBirthMutation = useMutation(async (NewBirthObj) => await client.post("/", NewBirthObj))

  const newAnniversaryHandler = async (e) => {
    e.preventDefault();

    if (newUrl === "") {
      alert("You must upload an image")
      return
    }

    const result = await createNewBirthMutation.mutateAsync({
      name: newName,
      age: newAge,
      url: newUrl,
      reminder: newReminder ? 1 : 0
    });

    console.log("createNewBirthMutation",result)

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
    <form className="add-form" onSubmit={((event) => newAnniversaryHandler(event))}>
      <div className="form-control">
        <LabelInputs htmlFor="name">Add a name</LabelInputs>
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
        <LabelInputs>Add the age</LabelInputs>
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
        <button style={{ backgroundColor: "#4ED4AC", padding: "8px 20px", fontsize: "1.2rem" }} onClick={handleUpload}>Upload an image</button>
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
        <LabelCheckBox>Important</LabelCheckBox>
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

const LabelCheckBox = styled.label`
font-size: 1.1rem;
text-align: end;
`

const LabelInputs = styled.label`
font-size: 1.1rem;

`

export default NewBirth;
