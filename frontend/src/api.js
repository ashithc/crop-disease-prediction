import axios from "axios";

const API = axios.create({
  baseURL: "http://35.154.207.244:5000",
});

export default API;
