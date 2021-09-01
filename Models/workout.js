const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
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
        },

    }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;