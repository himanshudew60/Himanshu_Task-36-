const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    loads: {
        type: Number,
      required: true,

    },
    reps:{
         type: Number,
      required: true, 
    }
    
  },
  {
        
  timestamps: true

}
);

const Workout = mongoose.model("Workout", userSchema);

module.exports = Workout;