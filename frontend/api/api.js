import axios from "axios";

const api = axios.create({
       baseURL: "https://ethioglobal-digital.onrender.com",
       withCredentials: true,
});

export default api;
