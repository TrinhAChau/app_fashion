import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "http://cshapi.ddns.net:3000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export default BASE_URL;
