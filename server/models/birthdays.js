const connection = require("../db");

const getAllBirthdays = async () => {
 return await connection.promise().query('SELECT * FROM birthday')
  .then(([results, fields]) => results);
};

const getBirthdayById = async (id) => {
 return await connection.promise().query('SELECT * FROM birthday WHERE id = ?', [id])
  .then(([results, fields]) => results);
};

const addBirthday = async (body) => {
 return await connection.promise().query('INSERT INTO birthday (name, age, url, reminder) VALUES (?, ?, ?, ?)', [body.name, body.age, body.url, body.reminder])
  .then(([results]) => results);
};

const updateBirthday = async (id, body) => {
 return await connection.promise().query('UPDATE birthday SET ? WHERE id = ?', [body, id])
  .then(([results]) => results);
};

const deleteBirthday = async (id) => {
 return await connection.promise().query('DELETE FROM birthday WHERE id = ?', id)
  .then(([results]) => results);
};


module.exports = {
 getAllBirthdays,
 getBirthdayById,
 addBirthday,
 updateBirthday,
 deleteBirthday,
}