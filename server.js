//DEPENDENCIES
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require("express-session")
const app = express()
const fruitsController = require("./controllers/fruits")
const userController = require("./controllers/UsersController")
const sessionsController = require("./controllers/sessions_controller.js");


//CONFIG
const PORT = process.env.PORT;
const mongoURI = process.env.MONGO_URI
app.use(methodOverride('_method'))
app.use("/fruits", fruitsController)
app.use(express.urlencoded({extended: false}))
app.use("/users", userController)
app.use("/sessions", sessionsController);
app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    })
  );
mongoose.connect(mongoURI, {}, () => {
    console.log("Connected to MongoDB");
})

//LISTENER
app.listen(PORT, () => {
    console.log("App is listening on", PORT);
})