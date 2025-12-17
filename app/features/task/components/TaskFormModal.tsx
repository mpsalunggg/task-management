import { Modal } from '~/components/ui'
import { TaskForm, type TaskFormData } from './TaskForm'
import type { Task } from '../types'

interface TaskFormModalProps {
  isOpen: boolean
  task?: Task
  onClose: () => void
  onSubmit: (data: TaskFormData) => void
  isLoading?: boolean
}

export function TaskFormModal({
  isOpen,
  task,
  onClose,
  onSubmit,
  isLoading,
}: TaskFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit Task' : 'Create New Task'}
    >
      <TaskForm
        task={task}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  )
}
