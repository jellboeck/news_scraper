var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(express.urlencoded({
    extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function (error){
    if (error){
        console.log(error);
    }
    console.log("mongoose connection successful")
})

app.listen(PORT, function(){
    console.log("listening on port: " + PORT);
});




