import http from '~/lib/axios'
import { setToken, removeToken } from '~/lib/token'
import type { ApiResponse } from '~/types/response.types'

interface RegisterInput {
  username: string
  email: string
  password: string
  name: string
}

interface LoginInput {
  username: string
  password: string
}

interface UserResponse {
  id: string
  username: string
  email: string
  name: string
  createdAt: string
}

interface LoginResponse extends UserResponse {
  token: string
}

export const authServices = {
  register: async (data: RegisterInput): Promise<ApiResponse<UserResponse>> => {
    const response = await http.post<ApiResponse<UserResponse>>(
      '/auth/register',
      data
    )
    return response.data
  },

  login: async (data: LoginInput): Promise<ApiResponse<LoginResponse>> => {
    const response = await http.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data
    )

    if (response.data.success && response.data.data?.token) {
      setToken(response.data.data.token)
    }

    return response.data
  },

  logout: (): void => {
    removeToken()
  },
}
