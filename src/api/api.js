import axios from 'axios'

const api = axios.create({
    // baseURL: "https://luxora-backend-lime.vercel.app/api"
    baseURL: "http://localhost:3000/api"
})

export default api;