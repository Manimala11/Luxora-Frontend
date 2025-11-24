import axios from 'axios'

const api = axios.create({
    baseURL: "https://luxora-backend-lime.vercel.app/api"
})

export default api;