import React from "react";
import { deleteWorkout } from "../services/WorkOutService";
import { useWorkout } from "../context/WorkoutContext";

function Card({ workout, onEdit }) {
  const { dispatch } = useWorkout();

  const deleteWork = async () => {
    try {
      await deleteWorkout(workout._id);

      dispatch({
        type: "REMOVE_WORKOUT",
        payload: workout._id
      });

      dispatch({
        type: "CLEAR_ERROR"
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Unable to delete workout"
      });
    }
  };

  return (
    <div className="w-full rounded-xl border bg-white p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-green-400">
          {workout.title}
        </h1>

        <p className="text-sm font-bold">
          Load (in Kgs): {workout.loads}
        </p>

        <p className="text-sm font-bold">
          Reps: {workout.reps}
        </p>

        <p className="text-xs">
          {new Date(workout.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={deleteWork}
          className="rounded-3xl bg-gray-200 px-4 py-1"
        >
          🗑️
        </button>

        <button
          onClick={() => onEdit(workout)}
          className="rounded-3xl bg-gray-200 px-4 py-1"
        >
          ✒️
        </button>
      </div>
    </div>
  );
}

export default Card;