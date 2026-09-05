const express= require('express');
const { getWorkout,getWorkouts,createWorkout,updateWorkout,deleteWorkout } = require('../controllers/workoutController')
const router = express.Router();



router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.post("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);




module.exports = router;