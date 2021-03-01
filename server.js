const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "MONGODB://localhost/workout", { useNewUrlParser: true });

db.Workout.create({ name: "Workout Database"})
  .then(dbWorkout => {
      console.log(dbWorkout);
  })
  .catch(({error}) => {
      console.log(error)
  });

app.listen(PORT, () => {
    console.log(`App is running at localhost:${PORT}`);
})
