import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
console.log(import.meta.env.VITE_API_BASE_URL)
export default axios
