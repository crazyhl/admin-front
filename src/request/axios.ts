import axios from 'axios'
import router from '@/router'

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
    if (error.status === 401) {
      // 返回 401 应该要进行跳转到登录
      const route = router.currentRoute.value // 直接获取当前路由
      console.log(route.fullPath)
      return router.push({ name: 'login', query: { redirect: route.fullPath } })
    }
    return Promise.reject(error)
  },
)

export default instance
