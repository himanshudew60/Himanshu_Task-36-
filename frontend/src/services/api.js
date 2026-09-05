import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/work",
});

export default api;