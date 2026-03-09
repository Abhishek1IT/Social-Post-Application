import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Create a custom Axios instance for the app
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Send cookies with requests
});

// Middleware: Runs before every request is sent
api.interceptors.request.use((config) => {
  // Retrieve the auth token from local storage
  const token = localStorage.getItem("token");

  // If a token exists, attach it to the headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // Continue with the request
});

export default api;