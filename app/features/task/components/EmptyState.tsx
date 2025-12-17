import styled from 'styled-components'
import { ListTodo } from 'lucide-react'

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`

const EmptyStateIcon = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray[400]};
  opacity: 0.5;
`

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSize.base};
  margin: 0;
`

export function EmptyState() {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon>
        <ListTodo size={48} strokeWidth={1.5} />
      </EmptyStateIcon>
      <EmptyStateText>No tasks yet. Create your first task!</EmptyStateText>
    </EmptyStateContainer>
  )
}
