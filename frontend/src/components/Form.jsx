import React, { useEffect, useState } from "react";
import {
  createWorkOut,
  updateWorkout
} from "../services/WorkOutService";
import { useWorkout } from "../context/WorkoutContext";

function Form({ editingWorkout, onEditDone }) {
  const { dispatch } = useWorkout();

  const [title, setTitle] = useState("");
  const [loads, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

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

    setError("");

    if (!title || !loads || !reps) {
      setError("Please fill all fields");
      return;
    }

    const data = {
      title,
      loads: Number(loads),
      reps: Number(reps)
    };

    try {
      if (editingWorkout) {
        const response = await updateWorkout(
          editingWorkout._id,
          data
        );

        dispatch({
          type: "UPDATE_WORKOUT",
          payload: response.data
        });

        onEditDone();
      } else {
        const response = await createWorkOut(data);

        dispatch({
          type: "ADD_WORKOUT",
          payload: response.data
        });

        setTitle("");
        setLoad("");
        setReps("");
      }

      dispatch({ type: "CLEAR_ERROR" });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl bg-gray-300 p-5"
    >
      <h1 className="mb-4 text-xl font-bold">
        {editingWorkout
          ? "Update Workout"
          : "Add New Workout"}
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div>
          <label className="mb-1 block font-semibold">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border bg-white p-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-semibold">
            Load
          </label>

          <input
            type="number"
            value={loads}
            onChange={(e) => setLoad(e.target.value)}
            className="w-full rounded-lg border bg-white p-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-semibold">
            Reps
          </label>

          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full rounded-lg border bg-white p-2 outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          {editingWorkout
            ? "Update Workout"
            : "Add Workout"}
        </button>

        {editingWorkout && (
          <button
            type="button"
            onClick={onEditDone}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;