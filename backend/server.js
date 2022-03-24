const express = require("express");

require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.use("/api/restaurant", require("./src/routes/retaurant"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
