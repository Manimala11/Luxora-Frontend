import axios from 'axios'

const api = axios.create({
    baseURL: "https://luxora-fashion-backend.vercel.app/api"
})

export default api;