const express = require("express");
const routes = require("./routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

//Setting up JSON body parser
app.use(express.json());

//Setting up routes
app.use("/", routes);

app.listen(port, () => console.log(`App server listening on port ${port}!`));
