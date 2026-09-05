
import api from "./api";


export const createWorkOut = async (data) => {
  const response = await api.post("/", data);
  return response.data;
};



export const getWorkouts = async () => {
  const response = await api.get("/");
  return response.data;
};



export const getWorkout = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};



export const updateWorkout = async (id, data) => {
  const response = await api.post(`/${id}`, data);
  return response.data;
};


export const deleteWorkout = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
