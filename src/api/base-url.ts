import axios from 'axios';
export const API_SERVICE_URL = '/api';
export const API_HEADERS = {
  // 'Content-Type': '*/**',
};

export const api = axios.create({
  baseURL: API_SERVICE_URL,
  headers: API_HEADERS,
  withCredentials: true,
});
