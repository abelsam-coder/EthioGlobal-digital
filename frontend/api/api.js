import axios from "axios";

const api = axios.create({
       baseURL: "https://ethioglobal-digital-1.onrender.com",
       withCredentials: true,
});

export default api;
