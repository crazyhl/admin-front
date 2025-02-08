import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

instance.defaults.withCredentials = true
instance.defaults.withXSRFToken = true

// 全局响应拦截器封装只返回需要的数据
instance.interceptors.response.use(
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

export default instance
