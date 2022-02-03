const birthdayRouter = require('express').Router()
const birthdayController = require('../controllers/birthdaysControllers');

/* Birthday Routers */


birthdayRouter.get('/', birthdayController.getAllBirthdays);
birthdayRouter.get('/:id', birthdayController.getBirthdayById);
birthdayRouter.post('/', birthdayController.addBirthday);
birthdayRouter.patch('/:id', birthdayController.updateBirthday);
birthdayRouter.delete('/:id', birthdayController.deleteBirthday);

// Export the user routes
module.exports = birthdayRouter