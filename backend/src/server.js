const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

//Setting up JSON body parser
app.use(express.json());
app.use(cors());

//Setting up routes
app.use("/", routes);
app.use("/api", require("./routes/index"));

mongoose
  .connect(`${process.env.MONGO_DB_URI}`, { useNewUrlParser: true })
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
