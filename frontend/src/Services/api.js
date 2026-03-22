import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

export const getMetadata = (url) =>
  API.get(`/media/info?url=${encodeURIComponent(url)}`);

export const convertMedia = (params) =>
  API.get(`/media/convert`, { params });