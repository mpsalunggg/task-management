import styled from 'styled-components'
import {
  TaskBoard,
  LoadingState,
  ErrorState,
  TaskFormModal,
  TaskPageHeader,
  DeleteTaskModal,
  EmptyState,
} from '../components'
import { useTaskContext, TaskProvider } from '../context/TaskContext'
import type { Task } from '../types'

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

function TaskPageContent() {
  const {
    tasks,
    loading,
    error,
    isModalOpen,
    editingTask,
    isDeleteModalOpen,
    taskToDelete,
    isSubmitting,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
  } = useTaskContext()

  const handleSubmit = async (data: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, data)
    } else {
      await createTask(data)
    }
  }

  const handleDeleteClick = (task: Task) => {
    openDeleteModal(task)
  }

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete.id)
      } catch (err) {
        // Error handled in context
      }
    }
  }

  return (
    <PageContainer>
      <TaskPageHeader onNewTaskClick={openCreateModal} />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && tasks.length === 0 && !error && <EmptyState />}
      {!loading && tasks.length > 0 && (
        <TaskBoard
          tasks={tasks}
          onTaskMove={moveTask}
          onEdit={openEditModal}
          onDelete={handleDeleteClick}
        />
      )}

      <TaskFormModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        task={taskToDelete}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isSubmitting}
      />
    </PageContainer>
  )
}

export function TaskPage() {
  return (
    <TaskProvider>
      <TaskPageContent />
    </TaskProvider>
  )
}
