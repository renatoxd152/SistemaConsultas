import Axios, { AxiosInstance } from 'axios'

export const httpClient:AxiosInstance = Axios.create({
    baseURL:"localhost:8080"
})