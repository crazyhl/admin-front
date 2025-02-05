import axios from './axios.ts'

export function testGet() {
  return axios.get('http://localhost')
}
