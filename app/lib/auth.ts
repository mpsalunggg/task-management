import { getToken } from './token'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  userId: string
  username: string
  email: string
  exp?: number
  iat?: number
}

export const isAuthenticated = (): boolean => {
  const token = getToken()

  if (!token) {
    return false
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token)

    if (!decoded || !decoded.userId) {
      return false
    }

    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000)
      if (currentTime >= decoded.exp) {
        return false
      }
    }

    return true
  } catch (error) {
    return false
  }
}

export const getCurrentUser = (): {
  userId: string
  username: string
  email: string
} | null => {
  const token = getToken()

  if (!token) {
    return null
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token)

    if (!decoded || !decoded.userId) {
      return null
    }

    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000)
      if (currentTime >= decoded.exp) {
        return null
      }
    }

    return {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    }
  } catch (error) {
    return null
  }
}
