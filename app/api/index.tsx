import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "http://10.0.2.2:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export default BASE_URL;
