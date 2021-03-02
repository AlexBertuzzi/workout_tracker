const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

const databaseUrl = "workout";
const collection =["workouts"];
const db = mongojs(databaseUrl, collection);

 db.on("error", err => {
     console.log(err)
 });
 
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "MONGODB://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
    });

app.use(require("./routes/routes.js"));

app.listen(PORT, () => {
    console.log(`App is running at localhost:${PORT}`);
})
