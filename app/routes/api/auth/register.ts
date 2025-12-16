import { type ActionFunctionArgs } from 'react-router'
import { userStorage, generateId, hashPassword } from '~/lib/storage'

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await request.json()
    const { username, email, password, name } = body

    if (!username || !email || !password || !name) {
      return Response.json(
        { error: 'All fields are required (username, email, password, name)' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (userStorage.exists(username, email)) {
      return Response.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      )
    }

    const newUser = userStorage.create({
      id: generateId(),
      username,
      email,
      password: hashPassword(password),
      name,
      createdAt: new Date().toISOString(),
    })

    const { password: _, ...user } = newUser

    return Response.json(
      {
        success: true,
        message: 'User registered successfully',
        data: user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function loader() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}
