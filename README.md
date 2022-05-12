# Food app

## About
* **Project**: Funter, the food application, look at the food on your feed and proceed to feed yourself. 
* **Team Name**: SE750-hilarious-herons
* For more Documentation, please check the wiki pages.

Frontend is developed by using:
* [React](https://reactjs.org/)
* [Ionic Framework](https://ionicframework.com/)

Backend is developed by using: 
* Node.js
* MongoDB
* Firebase
## Before run
Make sure you install:
* [Node.js](https://nodejs.org/en/)
* npm
* Firebase set up
* Have a MongoDB instance setup and have the connection string available
* A text editor - some recommend
   - [VS Code](https://code.visualstudio.com/)
   - [WebStorm](https://www.jetbrains.com/webstorm/)

## To run
### Frontend
Inside repository, open terminal
```In the terminal command line
cd frontend //move into the frontend folder
npm install //install all the dependencies, only need to run once
npm run start 
```
### Backend
1. Create a .env file at the root of the backend directory, with a variable `MONGO_DB_URI` that contains the connection string for your MongoDB instance
2. Open a terminal 
```In the terminal command line
cd backend //move to the backend project directory
npm install //install all the dependencies, only need to run once
npm run start 
```
