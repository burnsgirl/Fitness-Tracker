const router = require("express").Router();
const Workout = require("../Models/workout");

//Add exercise to the most recent workout
router.put("/api/workouts/:id", (req,res) => {
    // findone and update and pass through id to update
});

//Add new exercise
router.post("/api/workouts", (req, res) => {
    try {
        const workoutData = await Workout.create(req.body);
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(404).json(err);
    }
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
    .catch((err) => res.json(err));
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
    .catch((err) => res.json(err));
});

module.exports = router;