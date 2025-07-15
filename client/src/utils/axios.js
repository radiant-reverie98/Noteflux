import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // needed to send/receive cookies (JWT)
});

export default API;
