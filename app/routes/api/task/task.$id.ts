import { type LoaderFunctionArgs, type ActionFunctionArgs } from 'react-router'
import { taskStorage } from '~/lib/storage'
import { requireAuth, isAuthUser, type AuthUser } from '~/lib/middleware'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const authResult = await requireAuth(request)

  if (!isAuthUser(authResult)) {
    return authResult
  }

  const user = authResult
  const { id } = params

  if (!id) {
    return Response.json({ error: 'Task ID is required' }, { status: 400 })
  }

  return getTaskById(id, user)
}

export async function action({ request, params }: ActionFunctionArgs) {
  const authResult = await requireAuth(request)

  if (!isAuthUser(authResult)) {
    return authResult
  }

  const user = authResult
  const { id } = params

  if (!id) {
    return Response.json({ error: 'Task ID is required' }, { status: 400 })
  }

  if (request.method === 'PUT' || request.method === 'PATCH') {
    return updateTask(request, id, user)
  }

  if (request.method === 'DELETE') {
    return deleteTask(id, user)
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

const getTaskById = async (id: string, user: AuthUser) => {
  try {
    const task = taskStorage.getById(id)

    if (!task) {
      return Response.json({ error: 'Task not found' }, { status: 404 })
    }

    if (task.userId !== user.userId) {
      return Response.json(
        { error: 'Unauthorized - You can only access your own tasks' },
        { status: 403 }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Task fetched successfully',
        data: task,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get task error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const updateTask = async (request: Request, id: string, user: AuthUser) => {
  try {
    const task = taskStorage.getById(id)

    if (!task) {
      return Response.json({ error: 'Task not found' }, { status: 404 })
    }

    if (task.userId !== user.userId) {
      return Response.json(
        { error: 'Unauthorized - You can only modify your own tasks' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, status, priority } = body

    if (status) {
      const validStatuses = ['todo', 'in-progress', 'completed']
      if (!validStatuses.includes(status)) {
        return Response.json(
          { error: 'Invalid status. Must be: todo, in-progress, or completed' },
          { status: 400 }
        )
      }
    }

    if (priority) {
      const validPriorities = ['low', 'medium', 'high']
      if (!validPriorities.includes(priority)) {
        return Response.json(
          { error: 'Invalid priority. Must be: low, medium, or high' },
          { status: 400 }
        )
      }
    }

    const updates: {
      title?: string
      description?: string
      status?: string
      priority?: string
    } = {}

    if (title !== undefined) updates.title = title
    if (description !== undefined) updates.description = description
    if (status !== undefined) updates.status = status
    if (priority !== undefined) updates.priority = priority

    const updatedTask = taskStorage.update(id, updates)

    return Response.json(
      {
        success: true,
        message: 'Task updated successfully',
        data: updatedTask,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update task error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const deleteTask = async (id: string, user: AuthUser) => {
  try {
    const task = taskStorage.getById(id)

    if (!task) {
      return Response.json({ error: 'Task not found' }, { status: 404 })
    }

    if (task.userId !== user.userId) {
      return Response.json(
        { error: 'Unauthorized - You can only delete your own tasks' },
        { status: 403 }
      )
    }

    const deleted = taskStorage.delete(id)

    if (!deleted) {
      return Response.json({ error: 'Failed to delete task' }, { status: 500 })
    }

    return Response.json(
      {
        success: true,
        message: 'Task deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete task error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
