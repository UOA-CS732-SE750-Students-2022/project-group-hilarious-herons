# Funter
**Team**: SE750-hilarious-herons

## About

Funter is a food finding application. Instead of picking a restaurant and browsing the food there, Funter enables you to see the food first. Pick what you like from browsing through multiple food reviews and explore their restaurant details. When you want to try something new but do not know what, Funter provides a way to find good food around you based on others people’s dining experiences.

### Key Features ###
   * Browse reviews of food from restaurants nearby 
   * Liking review to save them for later reference
   * Creation of new posts to share their experiences with others
   * Searching for reviews by their name, retaurant details and any related keywords  
<details><summary>Browse screenshots</summary>
  
  ![image](https://user-images.githubusercontent.com/68038316/168453303-c986e59b-5047-47f5-82a7-3cda115fa444.png)
  
  ![image](https://user-images.githubusercontent.com/68038316/168453314-11c79162-4128-4fb4-93f4-01b9e5980185.png)
  
  ![image](https://user-images.githubusercontent.com/68038316/168453462-ab13a043-5588-4eca-9a27-6378aae3ff55.png)

</details>

### Frontend Tech Stack ###
   * [React](https://reactjs.org/)
   * [Ionic Framework](https://ionicframework.com/)
### Backend Tech Stack ###
   *  [Node.js](https://nodejs.org/en/)
   *  MongoDB
   *  Firebase
### Documentation ###
For more information, please check the [wiki pages](https://github.com/UOA-CS732-SE750-Students-2022/project-group-hilarious-herons/wiki).
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
Navigate to ./frontend from root directory and run:
```bash
npm install
npm run start 
```
### Backend
**Prerequisite**: Create a `.env` file at the root of the backend directory, with a variable `MONGO_DB_URI` that contains the connection string for your MongoDB instance.

Navigate to `./backend` from the root directory and run:
```bash
npm install
npm run start
```
