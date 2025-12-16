import axios, { type AxiosInstance, type AxiosError } from 'axios'

const API_BASE_URL = 'http://localhost:5173/api'

const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

http.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    }

    const errorMessage =
      (error.response?.data as { error?: string })?.error ||
      error.message ||
      'Something went wrong'

    return Promise.reject(new Error(errorMessage))
  }
)

export default http
