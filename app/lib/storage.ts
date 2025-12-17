import { randomBytes, pbkdf2Sync } from 'crypto'

interface User {
  id: string
  username: string
  email: string
  password: string
  name: string
  createdAt: string
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  userId: string
  createdAt: string
  updatedAt: string
}

const users = new Map<string, User>()
const tasks = new Map<string, Task>()

const hashPasswordInternal = (password: string): string => {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

const verifyPasswordInternal = (
  password: string,
  hashedPassword: string
): boolean => {
  const [salt, originalHash] = hashedPassword.split(':')
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return hash === originalHash
}

const initializeData = () => {
  if (users.size === 0) {
    const admin: User = {
      id: '1',
      username: 'user1',
      email: 'user1@gmail.com',
      password: hashPasswordInternal('user1123'),
      name: 'User one',
      createdAt: '2024-01-15T09:00:00Z',
    }

    const user1: User = {
      id: '2',
      username: 'user2',
      email: 'user2@gmail.com',
      password: hashPasswordInternal('user2123'),
      name: 'User two',
      createdAt: '2024-01-15T09:30:00Z',
    }

    users.set(admin.id, admin)
    users.set(user1.id, user1)

    const task1: Task = {
      id: '1',
      title: 'Setup database server',
      description: 'Setup json-server untuk data tasks dan users',
      status: 'completed',
      priority: 'high',
      userId: '1',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    }

    const task2: Task = {
      id: '2',
      title: 'Implement authentication',
      description: 'Buat sistem autentikasi dengan user data',
      status: 'in-progress',
      priority: 'high',
      userId: '2',
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z',
    }

    const task3: Task = {
      id: '3',
      title: 'Create task management UI',
      description: 'Buat interface untuk manage tasks',
      status: 'todo',
      priority: 'medium',
      userId: '1',
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
    }

    tasks.set(task1.id, task1)
    tasks.set(task2.id, task2)
    tasks.set(task3.id, task3)
  }
}

initializeData()

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}

export const hashPassword = hashPasswordInternal
export const verifyPassword = verifyPasswordInternal

export const userStorage = {
  getByUsername: (username: string): User | undefined => {
    return Array.from(users.values()).find((u) => u.username === username)
  },

  getByEmail: (email: string): User | undefined => {
    return Array.from(users.values()).find((u) => u.email === email)
  },

  create: (user: User): User => {
    users.set(user.id, user)
    return user
  },

  exists: (username: string, email: string): boolean => {
    return Array.from(users.values()).some(
      (u) => u.username === username || u.email === email
    )
  },
}

export const taskStorage = {
  getAll: (): Task[] => {
    return Array.from(tasks.values())
  },

  getById: (id: string): Task | undefined => {
    return tasks.get(id)
  },

  getByUserId: (userId: string): Task[] => {
    return Array.from(tasks.values()).filter((t) => t.userId === userId)
  },

  create: (task: Task): Task => {
    tasks.set(task.id, task)
    return task
  },

  update: (id: string, updates: Partial<Task>): Task | undefined => {
    const task = tasks.get(id)
    if (!task) return undefined

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    tasks.set(id, updatedTask)
    return updatedTask
  },

  delete: (id: string): boolean => {
    return tasks.delete(id)
  },
}
