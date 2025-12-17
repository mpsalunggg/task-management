import { CheckSquare, Shield, GripVertical } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: CheckSquare,
    title: 'Task Management',
    description:
      'Create, update, and track your tasks with ease. Stay organized and productive',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description:
      'Your data is protected with JWT authentication and secure password hashing',
  },
  {
    icon: GripVertical,
    title: 'Drag and Drop Task',
    description:
      'Easily organize and prioritize your tasks with intuitive drag and drop functionality',
  },
]
