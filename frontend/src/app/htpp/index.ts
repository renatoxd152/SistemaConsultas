import Axios, { AxiosInstance } from 'axios';

// export const httpClient:AxiosInstance = Axios.create({
//      baseURL: "http://localhost:8080"
// })
export const httpClient:AxiosInstance = Axios.create({
  baseURL: "https://sistemaconsultas.onrender.com"
})

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });