const express= require('express');
const { getWorkout,getWorkouts,createWorkout,updateWorkout,deleteWorkout } = require('../controllers/workoutController')
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')


router.get("/", requireAuth,getWorkouts);
router.get("/:id", getWorkout);
router.post("/", requireAuth,createWorkout);
router.post("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);




module.exports = router;