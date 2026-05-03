import axios from "axios";

const api = axios.create({
       baseURL: "https://ethioglobal-digital-backend.onrender.com",
       withCredentials: true,
});

export default api;