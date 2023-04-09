import axios from 'axios';
export const API_SERVICE_URL = 'http://localhost:8081/'; //'https://24b0-76-69-107-164.ngrok.io' //"http://10.0.2.2:8081";
export const API_HEADERS = {
  Accept: '*/*',
  'Content-Type': 'application/json',
  Connection: 'keep-alive',
  'X-Request-ID': '',
};

export const api = axios.create({
  baseURL: API_SERVICE_URL,
  headers: API_HEADERS,
});
