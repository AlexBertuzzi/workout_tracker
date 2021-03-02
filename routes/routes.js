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
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(error => {
        res.status(401).json(error);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id,
        {
            $push: { exercises: req.body },
        },
        {
            new: true, 
            runValidators: true
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
    db.Workout.aggregate([{
            
        $limit: 7,
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .then(dbWorkout => {
        res.json(dbWorkout);
    });
});


module.exports = router;