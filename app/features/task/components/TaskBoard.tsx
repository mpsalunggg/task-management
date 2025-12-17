import { useState } from 'react'
import styled from 'styled-components'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import { TaskColumn } from './TaskColumn'
import { DraggableTaskItem } from './DraggableTaskItem'
import type { Task } from '../types'

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

interface TaskBoardProps {
  tasks: Task[]
  onTaskMove: (taskId: string, newStatus: Task['status']) => void
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function TaskBoard({
  tasks,
  onTaskMove,
  onEdit,
  onDelete,
}: TaskBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const validTasks = tasks.filter((task) => task && task.status)

  const tasksByStatus = {
    todo: validTasks.filter((task) => task.status === 'todo'),
    'in-progress': validTasks.filter((task) => task.status === 'in-progress'),
    completed: validTasks.filter((task) => task.status === 'completed'),
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = validTasks.find((t) => t.id === event.active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (
      overId === 'todo' ||
      overId === 'in-progress' ||
      overId === 'completed'
    ) {
      const task = validTasks.find((t) => t.id === activeId)
      if (task && task.status !== overId) {
        onTaskMove(activeId, overId as Task['status'])
      }
    }
  }

  const handleDragEnd = () => {
    setActiveTask(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <BoardContainer>
        <TaskColumn
          id="todo"
          title="To Do"
          tasks={tasksByStatus.todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <TaskColumn
          id="in-progress"
          title="In Progress"
          tasks={tasksByStatus['in-progress']}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <TaskColumn
          id="completed"
          title="Completed"
          tasks={tasksByStatus.completed}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </BoardContainer>

      <DragOverlay>
        {activeTask ? (
          <div style={{ opacity: 0.8 }}>
            <DraggableTaskItem task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
