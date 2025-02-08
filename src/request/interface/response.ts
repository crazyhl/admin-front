export interface responseData<T> {
  code: number
  message: string
  data: T
}

export interface loginResponse {
  type: string
  token: string
}
