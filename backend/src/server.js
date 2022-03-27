const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");

require("dotenv").config();
// console.log(process.env);

const app = express();
const port = process.env.PORT || 3001;

//Setting up JSON body parser
app.use(express.json());

//Setting up routes
app.use("/", routes);

//Connecting to remote MongoDB
mongoose
  .connect(
    `mongodb+srv://db-user:${process.env.MONGO_PASSWORD}@cluster0.vprvj.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(port, () => console.log(`App server listening on port ${port}!`))
  );
