import styled from 'styled-components'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui'
import { UserInfo } from './UserInfo'
import { Logout } from './Logout'

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
  }
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
          <Plus size={20} />
          New Task
        </Button>
        <Logout />
      </HeaderActions>
    </PageHeader>
  )
}
