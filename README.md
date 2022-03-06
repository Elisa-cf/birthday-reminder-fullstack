# Birthday Reminder 🥳🎉🎂 - Full-stack application

Live site: https://calm-falls-35922.herokuapp.com/

## About of this application

- Full-stack app deployed in Heroku.
- In this application you can add the birthday of your friends. Add their names, years and upload a picture from your device.
- Do you have a special friend? Add his or her birthday as a important by clicking on the checkbox.
- You can also double click on one of the birthdays that you have already added on the list and highlight it as important.
- Do you need to delete one of the birthdays from the list? Click on cross to remove one by one the birthdays that you want. 

### Frontend of this application:

The frontend app has been built with React.js. I used React Query and installed the npm package Axios library to make CRUD HTTP requests to Rest API. To fetch JSON data from the API I used the useQuery hook, and in order to create and delete data I used the useMutation hook.

- React.js
- React Hooks
- React Query
- Axios
- Styled Components
- Cloudinary

### Backend of this application:

The backend has been built following the MVC architecture pattern consisting of 3 parts: models, routes and controllers.

- Node.js
- Express.js
- mySQL
- Joi for data validation
- MVC architecture

### Deployment method:

- Heroku

## Installation 💻 :

To install the project locally:

- Clone the repository
- Install the dependencies for server => npm install 
- Install the dependencies for client => npm run client-install

## Quick Start 🏃:

- Run the client & server with concurrently => npm run dev
- Run the Express server only => npm run server 
- Run the React client only => npm run client
- Server runs on http://localhost:5000 and client on http://localhost:3000
