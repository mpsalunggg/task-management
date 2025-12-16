import { type ActionFunctionArgs } from 'react-router'
import { userStorage, verifyPassword } from '~/lib/storage'
import { generateToken } from '~/lib/jwt'

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return Response.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    const user =
      userStorage.getByUsername(username) || userStorage.getByEmail(username)

    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValidPassword = verifyPassword(password, user.password)

    if (!isValidPassword) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    })

    const { password: _, ...userWithoutPassword } = user

    return Response.json(
      {
        success: true,
        message: 'Login successful',
        data: { ...userWithoutPassword, token },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function loader() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}
