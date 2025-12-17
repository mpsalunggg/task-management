import styled from 'styled-components'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui'
import { UserInfo } from './UserInfo'
import { Logout } from './Logout'

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

interface TaskPageHeaderProps {
  onNewTaskClick: () => void
}

export function TaskPageHeader({ onNewTaskClick }: TaskPageHeaderProps) {
  return (
    <PageHeader>
      <PageTitle>Task Management</PageTitle>
      <HeaderActions>
        <UserInfo />
        <Button onClick={onNewTaskClick}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          New Task
        </Button>
        <Logout />
      </HeaderActions>
    </PageHeader>
  )
}
