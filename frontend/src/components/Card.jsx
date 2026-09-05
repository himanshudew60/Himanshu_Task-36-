import React from "react";
import { deleteWorkout } from "../services/WorkOutService";

function Card({ workout, onEdit, onWorkoutChange }) {

  const deleteWork = async (id) => {
    try {
      await deleteWorkout(id);

      // Refresh workout list after delete
      await onWorkoutChange();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-30 border bg-white flex justify-between items-center p-4">

      <div className="flex flex-col justify-center items-start gap-1">

        <h1 className="text-2xl font-bold text-green-400">
          {workout.title}
        </h1>

        <p className="font-bold text-sm">
          Load (in Kgs): {workout.loads}
        </p>

        <p className="font-bold text-sm">
          Reps: {workout.reps}
        </p>

        <p className="text-xs">
          {workout.createdAt}
        </p>

      </div>

      <div className="flex h-full flex-col justify-between items-start">

        {/* DELETE */}
        <button
          onClick={() => deleteWork(workout._id)}
          className="bg-gray-200 py-1 px-4 rounded-3xl"
        >
          🗑️
        </button>

        {/* UPDATE */}
        <button
          onClick={() =>{
             console.log("EDIT CLICKED:", workout);
              onEdit(workout)}}
          className="bg-gray-200 py-1 px-4 rounded-3xl"
        >
          ✒️
        </button>

      </div>

    </div>
  );
}

export default Card;