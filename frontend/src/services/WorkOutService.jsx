import api from "./api";

export const createWorkOut = async (data) => {
  const response = await api.post("/workouts", data);
  return response.data;
};

export const getWorkouts = async () => {
  const response = await api.get("/workouts");
  return response.data;
};

export const getWorkout = async (id) => {
  const response = await api.get(`/workouts/${id}`);
  return response.data;
};

export const updateWorkout = async (id, data) => {
  const response = await api.patch(`/workouts/${id}`, data);
  return response.data;
};

export const deleteWorkout = async (id) => {
  const response = await api.delete(`/workouts/${id}`);
  return response.data;
};