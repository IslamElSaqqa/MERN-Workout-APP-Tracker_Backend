const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
//1. Fetch All Workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}

//2. Fetch a single Workout
const getWorkout = async (req, res) => {
    const { id } = req.params; // Get the Id
    // Check that Id is valid and Written in BSON Format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = await Workout.findById(id);
    if (!workout) { 
        return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
}


//3. Create a new Workout and Handling error responses
const createWorkout = async (req, res) => { 
    const { title, reps, load } = req.body
    let emptyFields = []
    // Handling error responses
    if (!title) { emptyFields.push('title')}
    if (!load) { emptyFields.push('load')}
    if (!reps) { emptyFields.push('reps')}
    if (emptyFields.length > 0) { 
        return res.status(400).json({error: 'Please fill in all fields',emptyFields})
    }
    try {
        // Adding a new Workout.
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout)
    } catch (err) { 
        res.status(400).json({error: err.message})
    }
}

//4. Delete a workout
const deleteWorkout = async (req, res) => { 
    const { id } = req.params;
    // Check that Id is in the Bson Format
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ error: "No such workout to be deleted" });
    }
    // find and Delete from Mongoose
    const deletedWorkout = await Workout.findOneAndDelete({ _id: id });
    if (!deletedWorkout) { 
        return res.status(400).json({ error: "No such workout..." });
    }
    res.status(200).json(deletedWorkout);
}

//5. Update a workout
const updateWorkout = async (req, res) => { 
    const { id } = req.params;
    // Check that Id is in the Bson Format
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ error: "No such workout to be updated" });
    }
    // find and Delete from Mongoose
    const updatedWorkout = await Workout.findOneAndUpdate({ _id: id },
        { ...req.body }); // Spreading the requested data from the body
    if (!updatedWorkout) { 
        return res.status(400).json({ error: "No such workout..." });
    }
    res.status(200).json(updatedWorkout);
}
// Export Functions (Exporting all modules)
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}