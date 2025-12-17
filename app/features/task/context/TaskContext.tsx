import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import http from '~/lib/axios'
import type { Task } from '../types'
import type { TaskFormData } from '../components/TaskForm'

interface TaskContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  isModalOpen: boolean
  editingTask: Task | undefined
  isDeleteModalOpen: boolean
  taskToDelete: Task | undefined
  isSubmitting: boolean
  fetchTasks: () => Promise<void>
  createTask: (data: TaskFormData) => Promise<void>
  updateTask: (taskId: string, data: TaskFormData) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (taskId: string, newStatus: Task['status']) => Promise<void>
  openCreateModal: () => void
  openEditModal: (task: Task) => void
  openDeleteModal: (task: Task) => void
  closeModal: () => void
  closeDeleteModal: () => void
  setError: (error: string | null) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await http.get('/tasks')
      if (response.data.success) {
        const tasks = response.data.data.tasks || []
        setTasks(tasks)
        setError(null)
      } else {
        setError(response.data.error || 'Failed to fetch tasks')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (data: TaskFormData) => {
    try {
      setIsSubmitting(true)
      const response = await http.post('/tasks', data)
      if (response.data.success) {
        fetchTasks()
        setIsModalOpen(false)
        setError(null)
      }
    } catch (err: any) {
      setError(err.message)
      setIsModalOpen(false)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateTask = async (taskId: string, data: TaskFormData) => {
    try {
      setIsSubmitting(true)
      const response = await http.put(`/task/${taskId}`, data)
      if (response.data.success) {
        fetchTasks()
        setIsModalOpen(false)
        setEditingTask(undefined)
        setError(null)
      }
    } catch (err: any) {
      setError(err.message)
      setIsModalOpen(false)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await http.delete(`/task/${taskId}`)
      if (response.data.success) {
        fetchTasks()
        setIsDeleteModalOpen(false)
        setTaskToDelete(undefined)
        setError(null)
      }
    } catch (err: any) {
      setError(err.message)
      setIsModalOpen(false)
      throw err
    }
  }

  const moveTask = async (taskId: string, newStatus: Task['status']) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      )

      await http.put(`/task/${taskId}`, { status: newStatus })
      setError(null)
    } catch (err: any) {
      await fetchTasks()
      setError(err.message)
    }
  }

  const openCreateModal = () => {
    setEditingTask(undefined)
    setIsModalOpen(true)
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task)
    setIsDeleteModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(undefined)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTaskToDelete(undefined)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const value: TaskContextType = {
    tasks,
    loading,
    error,
    isModalOpen,
    editingTask,
    isDeleteModalOpen,
    taskToDelete,
    isSubmitting,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    setError,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
