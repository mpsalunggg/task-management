import styled from 'styled-components'
import { AlertCircle } from 'lucide-react'

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`

const ErrorIcon = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.danger};
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSize.base};
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <ErrorContainer>
      <ErrorIcon>
        <AlertCircle size={40} strokeWidth={2} />
      </ErrorIcon>
      <ErrorText>Error: {message}</ErrorText>
    </ErrorContainer>
  )
}
