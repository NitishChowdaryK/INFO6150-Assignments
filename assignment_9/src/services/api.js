import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

export const loginUser = async (email, password) => {
  const response = await api.post("/user/login", {
    email,
    password
  });
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get("/user/getAll");
  return response.data;
};

export default api;