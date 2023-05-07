import axios from 'axios';
export const API_SERVICE_URL = 'http://localhost:8081'; //'https://24b0-76-69-107-164.ngrok.io' //"http://10.0.2.2:8081";
export const API_HEADERS = {
  Accept: '*/*',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MmIzODExLTA5ZWEtNGU4MC05MDNlLWY1Y2Y2NTYxZTdiZSIsImVtYWlsIjoiZ3VyaW5kZXJyYXdhbGFAZ21haWwuY29tIiwiY2xpZW50aWQiOiJhMzllM2RhNi1iMTIwLTRjNTAtYjg5My1iMTI5ZjRjNWE0MjIiLCJkcml2ZXJJZCI6IjcyNDJhOTg3LTRiMmEtNGQ3Yi1hZmY1LTgyN2FlMDI4YmQ5OCIsImlhdCI6MTY4MTE3MjUxMywiZXhwIjoxNjgxMzQ1MzEzfQ.adVafWIYNyst88bUvlAsy0AmU-4w5TKDDp71rsAzO2I',
  // Cookie:
  // 'connect.sid=s%3Ap98jul6ar8DKkhXTPTyiTW5bXEEAHetW.eTrOSrB8BGzSsKfmR1dJkVKcO6DBuKZ8SFQtdjSSa%2Bw',
  'Content-Type': 'application/json',
  // Connection: 'keep-alive',
  'X-Request-ID': '',
};

export const api = axios.create({
  baseURL: API_SERVICE_URL,
  headers: API_HEADERS,
});
