import styled from 'styled-components'
import { useDroppable } from '@dnd-kit/core'
import { DraggableTaskItem } from './DraggableTaskItem'
import type { Task } from '../types'

const ColumnContainer = styled.div<{ $isOver: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem;
  min-height: 500px;
  transition: all 0.2s ease;
  border: 2px solid
    ${({ $isOver, theme }) =>
      $isOver ? theme.colors.primary : theme.colors.gray[200]};
`

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
`

const ColumnTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0;
`

const TaskCount = styled.span`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
`

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`

const EmptyColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
  padding: 2rem;
`

interface TaskColumnProps {
  id: string
  title: string
  tasks: Task[]
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function TaskColumn({
  id,
  title,
  tasks,
  onEdit,
  onDelete,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <ColumnContainer ref={setNodeRef} $isOver={isOver}>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <TaskCount>{tasks.length}</TaskCount>
      </ColumnHeader>
      <TasksContainer>
        {tasks.length === 0 ? (
          <EmptyColumn>No tasks in this column</EmptyColumn>
        ) : (
          tasks.map((task) => (
            <DraggableTaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </TasksContainer>
    </ColumnContainer>
  )
}
