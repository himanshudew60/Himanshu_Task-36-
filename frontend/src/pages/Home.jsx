import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Form from "../components/Form";
import { getWorkouts } from "../services/WorkOutService";
import { useWorkout } from "../context/WorkoutContext";

function Home() {
  const { state, dispatch } = useWorkout();
  const [editingWorkout, setEditingWorkout] = useState(null);

  const fetchWorkouts = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await getWorkouts();

      dispatch({
        type: "SET_WORKOUTS",
        payload: response.data
      });

      dispatch({ type: "CLEAR_ERROR" });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Unable to load workouts"
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-200">
      <Navbar />

      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-4">
          {state.loading && (
            <p className="text-center">Loading workouts...</p>
          )}

          {state.error && (
            <p className="rounded-lg bg-red-100 p-3 text-red-600">
              {state.error}
            </p>
          )}

          {state.workouts.map((workout) => (
            <Card
              key={workout._id}
              workout={workout}
              onEdit={setEditingWorkout}
            />
          ))}
        </div>

        <div className="min-w-0">
          <Form
            editingWorkout={editingWorkout}
            onEditDone={() => setEditingWorkout(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;