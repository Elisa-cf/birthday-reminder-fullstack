const Birthdays = require('../models/birthdays');
const Joi = require("joi");

const getAllBirthdays = async (req, res) => {
  // Query DB
 const data = await Birthdays.getAllBirthdays();
 // Check if there was data
 if (data.length) res.status(200).json(data);
 else res.status(404).send('No birthdays found');
}

const getBirthdayById = async (req, res) => {
 const id = req.params.id;

 const { error: validationErrors } = Joi.object({
  id: Joi.string().required()
 }).validate({ id }, { abortEarly: false });


 if (validationErrors) {
  res.status(422).json({ error: validationErrors.details })
 } else {
 // Query DB
 const data = await Birthdays.getBirthdayById(req.params.id);
 // If it was successful
 if (data.length) res.status(200).json(data[0]);
 else res.status(404).send('Birthday not found');
}
}
const addBirthday = async (req, res) => {
  const { name, age, url} = req.body;

  const { error: validationErrors } = Joi.object({
    name: Joi.string().max(255).required(),
    age: Joi.number().min(0).required(),
    url: Joi.string().required(),
  }).validate({ name, age, url}, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ error: validationErrors.details })
  } else {
     // Query DB
    const data = await Birthdays.addBirthday(req.body);
    // If it was successful
    if (data.affectedRows) {
        res.status(201).json({
        id: data.insertId,
        name: req.body.name,
        age: req.body.age,
        url: req.body.url,
        reminder: req.body.reminder,
      })
    } else {
      res.status(500).send('Error creating a birthday.');
    }
  }
}

const updateBirthday = async (req, res) => {
  const { name, age, url} = req.body;
  const id = req.params.id;
 
  const { error: validationErrors } = Joi.object({
    name: Joi.string().max(255),
    age: Joi.number().min(0),
    url: Joi.string(),
    id: Joi.string().required()
  }).validate({ name, age, url, id }, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ error: validationErrors.details })
  } else {
    // Query DB
    const data = await Birthdays.updateBirthday(req.params.id, req.body);
    // If it was successful
    if (data.affectedRows) {
      res.status(204).json(data);
    } else {
      res.status(500).send('Error updating a birthday.');
    }
  }
}

const deleteBirthday = async (req, res) => {
 const id = req.params.id;

 const { error: validationErrors } = Joi.object({
  id: Joi.string().required()
 }).validate({ id }, { abortEarly: false });


 if (validationErrors) {
  res.status(422).json({ error: validationErrors.details })
 } else {

  // Query
 const data = await Birthdays.deleteBirthday(req.params.id);
 // If it was successful
 if (data.affectedRows) res.status(204).json(data);
 else res.status(500).send('Error deleting a birthday.');
}
}

module.exports = {
 getAllBirthdays,
 getBirthdayById,
 updateBirthday,
 addBirthday,
 deleteBirthday,
}