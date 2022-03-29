const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

//Setting up JSON body parser
app.use(express.json());

//Setting up routes
app.use("/", routes);

mongoose
  .connect(
    `mongodb+srv://db-user:${process.env.MONGO_PASSWORD}@cluster0.vprvj.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then((result) => {
    console.log("MongoDB connection successful");
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`App server listening on port ${port}!`)
    );
  })
  .catch((error) => {
    console.log("MongoDB connection failed : ", error.message);
  });
