//getting environment variablesrequire("dotenv").config();
const LISTEN_PORT = process.env.PORT || 3005;

//importing middleware
const { logger, errorHandler } = require("./utils/middleware/logEvents");
const cors = require("cors");
const { corsOptions, credentials } = require("./utils/middleware/corsConfig");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const path = require("path");

//importing express and db and creating server instance
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./models/connection");

//setting handlebars as the viewengine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${path.join(__dirname, "public", "/views")}`);

//for the credentials to be set
app.use(credentials);
//middleware created for logging all requests
app.use(logger);
//for the cookies to be handled
//middleware for cookies
app.use(cookieParser());
//middleware for parsing urlencoded data in get requests
app.use(express.urlencoded({ extended: true }));
//middleware for reading out json
app.use(express.json());
//middleware for cross origin resource sharing
app.use(cors(corsOptions));

//only routes
app.get("/", (req, res) => {
  res.status(200).send(`Request received, we're live`);
});
app.use("/sendToLeon", require("./routes/sendToLeon"));

//errror handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
  app.listen(LISTEN_PORT, (err) => {
    if (err) console.log(err.message);
    console.log(`server listening on port ${LISTEN_PORT}`);
  });
});

// Export the Express API so vercel can have access building a serverless app
module.exports = app;
