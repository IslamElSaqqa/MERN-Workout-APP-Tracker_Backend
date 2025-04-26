/*  1. Define Express app
    2. Define the Model created 
    3. Define APIs
    4. Any api request is itself synchrounous.
    5. protecting API routes using jwt authorization 
*/
const express = require('express');
const router = express.Router()
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

// Protecting workout routes
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


// GET All Workouts
router.get('/', getWorkouts);

 // GET A single Workout
router.get('/:id', getWorkout);

// Add A new workout
router.post('/', createWorkout);

 // DELETE A WORKOUT
router.delete('/:id', deleteWorkout);

// Update A Workout
router.patch('/:id', updateWorkout);
module.exports = router;