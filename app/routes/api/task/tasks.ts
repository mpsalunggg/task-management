import { type LoaderFunctionArgs, type ActionFunctionArgs } from 'react-router'
import { taskStorage, generateId } from '~/lib/storage'
import { requireAuth, isAuthUser } from '~/lib/middleware'

export async function loader({ request }: LoaderFunctionArgs) {
  const authResult = await requireAuth(request)

  if (!isAuthUser(authResult)) {
    return authResult
  }

  const user = authResult

  try {
    const tasks = taskStorage.getByUserId(user.userId)

    return Response.json(
      {
        success: true,
        message: 'Tasks fetched successfully',
        data: {
          tasks,
          user: {
            id: user.userId,
            username: user.username,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get tasks error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const authResult = await requireAuth(request)

  if (!isAuthUser(authResult)) {
    return authResult
  }

  const user = authResult

  try {
    const body = await request.json()
    const { title, description, status, priority } = body

    if (!title || !description) {
      return Response.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['todo', 'in-progress', 'completed']
    if (status && !validStatuses.includes(status)) {
      return Response.json(
        { error: 'Invalid status. Must be: todo, in-progress, or completed' },
        { status: 400 }
      )
    }

    const validPriorities = ['low', 'medium', 'high']
    if (priority && !validPriorities.includes(priority)) {
      return Response.json(
        { error: 'Invalid priority. Must be: low, medium, or high' },
        { status: 400 }
      )
    }

    const newTask = taskStorage.create({
      id: generateId(),
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      userId: user.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return Response.json(
      {
        success: true,
        message: 'Task created successfully',
        data: newTask,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create task error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
