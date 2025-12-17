import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import {
  Input,
  InputLabel,
  InputGroup,
  InputError,
  Select,
  TextArea,
  Button,
} from '~/components/ui'
import type { Task } from '../types'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`

interface TaskFormProps {
  task?: Task
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export interface TaskFormData {
  title: string
  description: string
  status: Task['status']
  priority: Task['priority']
}

export function TaskForm({
  task,
  onSubmit,
  onCancel,
  isLoading,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'todo',
      priority: task?.priority || 'medium',
    },
  })

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      })
    }
  }, [task, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLabel htmlFor="title">
          Title <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <Input
          id="title"
          type="text"
          placeholder="Enter task title"
          $hasError={!!errors.title}
          $fullWidth
          disabled={isLoading}
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
        />
        {errors.title && <InputError>{errors.title.message}</InputError>}
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor="description">
          Description <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <TextArea
          id="description"
          placeholder="Enter task description"
          disabled={isLoading}
          {...register('description')}
        />
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor="status">
          Status <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <Select
          id="status"
          disabled={isLoading}
          {...register('status', {
            required: 'Status is required',
          })}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
        {errors.status && <InputError>{errors.status.message}</InputError>}
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor="priority">
          Priority <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <Select
          id="priority"
          disabled={isLoading}
          {...register('priority', {
            required: 'Priority is required',
          })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        {errors.priority && <InputError>{errors.priority.message}</InputError>}
      </InputGroup>

      <ButtonGroup>
        <Button
          type="button"
          $variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </Button>
      </ButtonGroup>
    </Form>
  )
}
