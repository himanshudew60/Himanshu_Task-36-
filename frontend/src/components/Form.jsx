import React, { useEffect, useState } from "react";

import {
  createWorkOut,
  updateWorkout
} from "../services/WorkOutService";

function Form({
  editingWorkout,
  onWorkoutChange,
  onCancel
}) {

  const [title, setTitle] = useState("");
  const [loads, setLoad] = useState("");
  const [reps, setReps] = useState("");

  // When editingWorkout changes,
  // populate the form
  useEffect(() => {

    if (editingWorkout) {

      setTitle(editingWorkout.title);
      setLoad(editingWorkout.loads);
      setReps(editingWorkout.reps);

    } else {

      setTitle("");
      setLoad("");
      setReps("");

    }

  }, [editingWorkout]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = {
        title: title,
        loads: Number(loads),
        reps: Number(reps)
      };

      // UPDATE
      if (editingWorkout) {

        const response = await updateWorkout(
          editingWorkout._id,
          data
        );

        console.log("Updated:", response);

      }

      // CREATE
      else {

        const response = await createWorkOut(data);

        console.log("Created:", response);

      }

      // Get latest data from database
      await onWorkoutChange();

      // Clear form
      setTitle("");
      setLoad("");
      setReps("");

      // Exit edit mode
      onCancel();

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 rounded-2xl p-5"
    >

      <h1 className="font-bold mb-2">
        {editingWorkout
          ? "Update Workout"
          : "Add New Workout"
        }
      </h1>


      {/* TITLE */}
      <div className="mb-3">

        <label>
          Exercise Title:
        </label>

        <br />

        <input
          className="bg-white rounded-md w-full h-8 mt-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>


      {/* LOAD */}
      <div className="mb-3">

        <label>
          Load (in Kg's):
        </label>

        <br />

        <input
          className="bg-white rounded-md w-full h-8 mt-2"
          type="number"
          value={loads}
          onChange={(e) => setLoad(e.target.value)}
        />

      </div>


      {/* REPS */}
      <div className="mb-3">

        <label>
          Reps:
        </label>

        <br />

        <input
          className="bg-white rounded-md w-full h-8 mt-2"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

      </div>


      {/* BUTTON */}
      <button
        type="submit"
        className="bg-green-500 mt-2 text-white px-4 py-2 rounded"
      >
        {editingWorkout
          ? "Update Workout"
          : "Add Workout"
        }
      </button>


      {/* CANCEL */}
      {editingWorkout && (
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 mt-2 ml-2 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}

    </form>
  );
}

export default Form;