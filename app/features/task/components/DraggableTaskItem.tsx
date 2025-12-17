import styled from 'styled-components'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import type { Task } from '../types'

const DraggableCard = styled.div<{ $isDragging: boolean }>`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background.primary};
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${({ $isDragging }) => ($isDragging ? 0 : 1)};
  position: relative;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }

  &:hover .task-actions {
    opacity: 1;
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const DragHandle = styled.div`
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-top: 0.125rem;
  flex-shrink: 0;
  cursor: grab;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[600]};
  }

  &:active {
    cursor: grabbing;
  }
`

const TaskTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
  flex: 1;
  word-break: break-word;
  cursor: pointer;
`

const TaskActions = styled.div`
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;
`

const ActionButton = styled.button<{ $variant?: 'delete' }>`
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: ${({ $variant, theme }) =>
    $variant === 'delete' ? theme.colors.danger : theme.colors.gray[600]};
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant, theme }) =>
      $variant === 'delete'
        ? theme.colors.dangerLight
        : theme.colors.gray[100]};
    color: ${({ $variant, theme }) =>
      $variant === 'delete' ? theme.colors.danger : theme.colors.gray[900]};
  }
`

const TaskDescription = styled.p`
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
  word-break: break-word;
`

const TaskMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const getPriorityColor = (priority: Task['priority']) => {
  const colors = {
    low: {
      bg: '#f3f4f6',
      text: '#374151',
    },
    medium: {
      bg: '#fef3c7',
      text: '#92400e',
    },
    high: {
      bg: '#fee2e2',
      text: '#991b1b',
    },
  }
  return colors[priority]
}

const PriorityBadge = styled.span<{ $priority: Task['priority'] }>`
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: capitalize;
  background-color: ${({ $priority }) => getPriorityColor($priority).bg};
  color: ${({ $priority }) => getPriorityColor($priority).text};
`

interface DraggableTaskItemProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function DraggableTaskItem({
  task,
  onEdit,
  onDelete,
}: DraggableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(task)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(task)
  }

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(task)
  }

  return (
    <DraggableCard ref={setNodeRef} style={style} $isDragging={isDragging}>
      <DragHandle
        {...attributes}
        {...listeners}
      >
        <CardHeader>
          <GripVertical size={16} />
          <TaskTitle onClick={handleTitleClick}>{task.title}</TaskTitle>

          <TaskActions className="task-actions">
            <ActionButton onClick={handleEdit} title="Edit task">
              <Pencil size={14} />
            </ActionButton>
            <ActionButton
              onClick={handleDelete}
              $variant="delete"
              title="Delete task"
            >
              <Trash2 size={14} />
            </ActionButton>
          </TaskActions>
        </CardHeader>
        {task.description && (
          <TaskDescription>{task.description}</TaskDescription>
        )}
        <TaskMeta>
          <PriorityBadge $priority={task.priority}>
            {task.priority}
          </PriorityBadge>
        </TaskMeta>
      </DragHandle>
    </DraggableCard>
  )
}
