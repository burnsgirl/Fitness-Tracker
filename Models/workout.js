const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        name: {
            type: String,
            trim: true,
            required: "Exercise name"
        },
        type: {
            type: String,
            trim: true,
            required: "Exercise type"
        },
        duration: {
            type: Number,
            required: "In minutes"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }],
})

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;