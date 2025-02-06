import axios from '@/request/axios.ts'
import type { LoginForm } from '@/request/interface/loginForm.ts'

export function login(form: LoginForm) {
  return axios.post('/login', form)
}
