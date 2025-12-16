import { verifyToken } from './jwt'

export interface AuthUser {
  userId: string
  username: string
  email: string
}

export const requireAuth = async (
  request: Request
): Promise<AuthUser | Response> => {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json(
      { error: 'Unauthorized - No token provided' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return Response.json(
      { error: 'Unauthorized - Invalid or expired token' },
      { status: 401 }
    )
  }

  return decoded
}

export const isAuthUser = (result: AuthUser | Response): result is AuthUser => {
  return !(result instanceof Response)
}
