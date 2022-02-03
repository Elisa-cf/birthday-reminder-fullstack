const birthdayRouter = require('./birthdayRouter');

const setupRoutes = (app) => {
 app.use('/api/birthday', birthdayRouter)
}

module.exports = {
setupRoutes,
}