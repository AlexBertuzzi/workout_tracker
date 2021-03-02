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
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
            "totalDuration": {
                $sum: "$exercise.duration"
            },
            "duration": "exercise.duration"
        }
    }]    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(error => {
        res.status(401).json(error);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.find({_id: req.params.id},
        {
            $push: { Exercise: req.body },
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(error => {
            res.status(401).json(error);
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    });
});


module.exports = router;