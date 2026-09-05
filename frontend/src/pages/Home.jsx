import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Form from "../components/Form";

import { getWorkouts } from "../services/WorkOutService";

function Home() {
  const [workouts, setWorkouts] = useState([]);

  // Store the workout that we want to edit
  const [editingWorkout, setEditingWorkout] = useState(null);

  const fetchWorkouts = async () => {
    try {
      const response = await getWorkouts();

      console.log(response);

      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="h-screen w-full bg-gray-200">

      <Navbar />

      <div className="flex w-full h-[85%] overflow-auto">

        {/* Workout List */}
        <div className="flex-1 max-h-full overflow-auto gap-y-10 flex flex-col justify-start items-center p-18">

          {workouts.map((workout) => (
            <Card
              key={workout._id}
              workout={workout}
              onEdit={setEditingWorkout}
              onWorkoutChange={fetchWorkouts}
            />
          ))}

        </div>

        {/* Form */}
        <div className="w-100 h-full p-4">

          <Form
            editingWorkout={editingWorkout}
            onWorkoutChange={fetchWorkouts}
            onCancel={() => setEditingWorkout(null)}
          />

        </div>

      </div>
    </div>
  );
}

export default Home;