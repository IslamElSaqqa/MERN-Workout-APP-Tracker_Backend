
/*  1. require mongoose ODM 
    2. Define Schema
    3. Apply restrictions (Constraints) on Schema
    4. export it as a model
*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model("Workout", workoutSchema);
