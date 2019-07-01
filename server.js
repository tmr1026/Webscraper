const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

let router = express.Router();

require("./models")
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(router);

const db = process.env.MONGODB_URI || "mongodb://localhost/Webscraper"

mongoose.connect(db, { useNewUrlParser: true }, function(error){
  if (error){
    console.log(error)
  }
  else{
    console.log("mongoose connection is successful")
  }
})

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`)
})