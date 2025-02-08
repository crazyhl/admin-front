import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

// 详情拦截器封装只返回需要的数据
axios.interceptors.response.use(
  (res) => {
    if (res.data.code != 0) {
      return Promise.reject(res.data.message)
    }
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axios
