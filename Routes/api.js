const router = require("express").Router();
const Workout = require("../Models/workout");

//Add exercise to the most recent workout
router.put("/api/workouts/:id", (req,res) => {
    // findone and update and pass through id to update
    Workout.findOne(
        params.id, {$push: {exercises:body}}
    )

    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

//Add new exercise
router.post("/api/workouts", (req, res) => {

        const workoutData = Workout.create(req.body);
        res.status(200).json(workoutData)
        .then((data) => res.json(data))
        .catch ((err) => {
        res.status(400).json(err)})
    
});

//View the combined weight of multiple exercises from the past seven workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregrate( [
        {
            $addFields: {
                totalWeight: {$sum: "$exercises.weight"}
            }
        }
    ]).limit(7)
    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

//View the total duration of each workout from the past seven workouts
router.get("/api/workouts/days", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ]).limit(7)
    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

module.exports = router;