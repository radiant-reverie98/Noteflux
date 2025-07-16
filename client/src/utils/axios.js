import axios from "axios";


console.log("✅ Axios Base URL:", import.meta.env.VITE_API_BASE_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // needed to send/receive cookies (JWT)
});

export default API;
