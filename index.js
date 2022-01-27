const express = require("express");
const connection = require("./db");
const serverPort = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
/*
connection.connect((err) => {
  if (err) {
    console.error("error connecting to db", err);
  } else {
    console.log("connected to db");
  }
});
*/
app.use(express.json());
app.use(cors());

app.get("/api/birthday", (req, res) => {
  connection
    .promise()
    .query("SELECT * FROM birthday")
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving birthdays from db.");
    });
});

app.get("/api/birthday/:id", (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query("SELECT * FROM birthday WHERE id = ?", [id])
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

const Joi = require("joi");

app.post("/api/birthday", (req, res) => {
  const { name, age, url, reminder } = req.body;

  const { error: validationErrors } = Joi.object({
    name: Joi.string().max(255).required(),
    age: Joi.number().min(0).required(),
  }).validate({ name, age }, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection
      .promise()
      .query("INSERT INTO birthday (name, age, url, reminder) VALUES (?, ?, ?, ?)", [
        name,
        age,
        url,
        reminder
      ])
      .then(([result]) => {
        const createdBirthday = { id: result.insertId, name, age, url, reminder };
        res.json(createdBirthday);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

app.patch("/api/birthday/:id", (req, res) => {
  const { error: validationErrors } = Joi.object({
    name: Joi.string().max(255),
    age: Joi.number().min(0),
    reminder: Joi.number().min(0).max(1),
  }).validate(req.body, { abortEarly: false });

  if (validationErrors)
    return res.status(422).json({ errors: validationErrors.details });

  // if I receive req.body.age I add "age = ?" to the query and I push req.body.age to the array
  // if I receive req.body.name I add "name = ?" to the query and I push req.body.name to the array
  // etc.
  //https://github.com/WildCodeSchool/2021-09-Remote-EN-REST-like-API/blob/main/index.js
  console.log(req.body.reminder);
  connection
    .promise()
    .query("UPDATE birthday SET reminder = ? WHERE id = ?", [
      req.body.reminder,
      req.params.id,
    ])
    .then(([result]) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete("/api/birthday/:id", (req, res) => {
  connection
    .promise()
    .query("DELETE FROM birthday WHERE id = ?", [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


// Serve static assets if in production. 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(serverPort);
