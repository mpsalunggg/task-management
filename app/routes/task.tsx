import { ProtectedRoute } from '~/components/layout/ProtectedRoute'
import { TaskPage } from '~/features/task/pages'

export function meta() {
  return [
    { title: 'Tasks - Task Management' },
    {
      name: 'description',
      content: 'Manage your tasks and stay organized',
    },
  ]
}

export default function Task() {
  return (
    <ProtectedRoute>
      <TaskPage />
    </ProtectedRoute>
  )
}
