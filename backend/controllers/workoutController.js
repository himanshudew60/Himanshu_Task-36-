
const Workout = require("../models/Workout");


const createWorkout = async (req, res) => {
  try {
    
    
    const { title, loads, reps } = req.body;
   
    
    // Validation
    if (!title || !loads  || !reps) {
      return res.status(400).json({
        success: false,
        message: "title, loads and reps are required",
      });
    }

    // Check duplicate workout
    const existingWorkout = await Workout.findOne({ title });

    if (existingWorkout) {
      return res.status(409).json({
        success: false,
        message: "Workout already exists",
      });
    }
    const workout = await Workout.create({
      title,
      loads,
      reps,
    });

    return res.status(201).json({
      success: true,
      message: "Workout created successfully",
      data: workout,
    });
  } catch (error) {
    console.error("Create Workout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch workouts"
    });
  }
};



const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: workout,
    });
  } catch (error) {
    console.error("Get Workout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, loads, reps } = req.body;


    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    // Update only provided fields
    if (title !== undefined) {
      workout.title = title;
    }

    if (loads !== undefined) {
      workout.loads = loads;
    }

    if (reps !== undefined) {
      workout.reps = reps;
    }

    await workout.save();

    return res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      data: workout,
    });
  } catch (error) {
    console.error("Update Workout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    await Workout.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    console.error("Delete Workout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};

