import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getMetadata = (url) =>
  API.get(`/media/info?url=${encodeURIComponent(url)}`);

export const convertMedia = (params) =>
  API.get(`/media/convert`, { params });

export const getStatus = (id) =>
  API.get(`/media/status/${id}`);