import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9193/api/v1",
});

export const API_URL = "http://localhost:9193";