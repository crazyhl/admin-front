import axios from '@/request/axios.ts'

export function captcha() {
  return axios.get('/captcha')
}
