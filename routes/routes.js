const router = require("express").Router();
const db = require("../models");

//html routes
router.get("/", (req, res) => {
    res.redirect("index.html");
});

router.get("/exercise", (req, res) => {
    res.redirect("exercise.html");
});

router.get("/stats", (req, res) => {
    res.redirect("stats.html");
});

//api routes
router.get("/api/workout", (req, res) => {
    db.find({})
    .sort({ date:-1 })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
});

router.post("/api/workout", ({body}, res) => {
    db.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(error => {
        res.status(400).json(error);
    });
});


module.exports = router;