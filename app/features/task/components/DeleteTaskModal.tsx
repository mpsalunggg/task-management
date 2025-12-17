import styled from 'styled-components'
import { AlertTriangle } from 'lucide-react'
import { Button, Modal } from '~/components/ui'
import type { Task } from '../types'

const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const DeleteWarning = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.danger};
`

const WarningIcon = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  flex-shrink: 0;
`

const WarningText = styled.div`
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.5;
`

const TaskInfo = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.radius.md};
`

const TaskTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 0.25rem;
`

const TaskDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
`

const DeleteButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`

interface DeleteTaskModalProps {
  isOpen: boolean
  task?: Task
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteTaskModal({
  isOpen,
  task,
  onClose,
  onConfirm,
  isLoading,
}: DeleteTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      <DeleteModalContent>
        <DeleteWarning>
          <WarningIcon>
            <AlertTriangle size={24} />
          </WarningIcon>
          <WarningText>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </WarningText>
        </DeleteWarning>

        {task && (
          <TaskInfo>
            <TaskTitle>{task.title}</TaskTitle>
            {task.description && (
              <TaskDescription>{task.description}</TaskDescription>
            )}
          </TaskInfo>
        )}

        <DeleteButtonGroup>
          <Button $variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button $variant="danger" onClick={onConfirm} disabled={isLoading}>
            Delete
          </Button>
        </DeleteButtonGroup>
      </DeleteModalContent>
    </Modal>
  )
}
