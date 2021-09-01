const router = require("express").Router();
const Workout = require("../Models/Workout");

//Add exercise to the most recent workout
router.put("/api/workouts/:id", (req,res) => {
    // findone and update and pass through id to update
    Workout.findByIdAndUpdate(
        req.params.id, {$push: {exercises: req.body}}
    )

    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

//Add new exercise
router.post("/api/workouts", ({body}, res) => {

        Workout.create(body)
        .then((data) => res.json(data))
        .catch ((err) => {
        res.status(400).json(err)})
    
});

//View the combined weight of multiple exercises from the past seven workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate( [
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
            },
        },
    ])
    .limit(7)
    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

//View the total duration of each workout from the past seven workouts///
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: 
            {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
            },
        },
    ])
    .sort({_id: -1})
    .limit(7)
    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

module.exports = router;