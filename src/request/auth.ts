import axios from '@/request/axios.ts'
import type { LoginForm } from '@/request/interface/loginForm.ts'
import { ElNotification } from 'element-plus'
import type { loginResponse, responseData } from '@/request/interface/response.ts'
import type { RegisterForm } from '@/request/interface/registerForm.ts'

export function login(form: LoginForm) {
  return new Promise((resolve) => {
    axios
      .post<never, responseData<loginResponse>>('/login', form)
      .then((res) => {
        // 存储 token
        localStorage.setItem('token', res.data.type + ' ' + res.data.token)
        console.log(localStorage.getItem('token'))
        // 后续吧参数交给自定义处理方法
        resolve(res)
      })
      .catch((err) => {
        // 错误处理
        ElNotification({
          title: '登录错误',
          message: err.response.data.message,
          type: 'error',
        })
      })
  })
}

export function register(form: RegisterForm) {
  return new Promise((resolve) => {
    axios
      .post<never, responseData<loginResponse>>('/register', form)
      .then((res) => {
        // 存储 token
        localStorage.setItem('token', res.data.type + ' ' + res.data.token)
        // 后续吧参数交给自定义处理方法
        resolve(res)
      })
      .catch((err) => {
        // 错误处理
        ElNotification({
          title: '登录错误',
          message: err.response.data.message,
          type: 'error',
        })
      })
  })
}
