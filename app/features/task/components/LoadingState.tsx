import styled, { keyframes } from 'styled-components'
import { Loader2 } from 'lucide-react'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`

const LoadingIcon = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};

  svg {
    animation: ${spin} 1s linear infinite;
  }
`

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSize.base};
  margin: 0;
`

export function LoadingState() {
  return (
    <LoadingContainer>
      <LoadingIcon>
        <Loader2 size={40} strokeWidth={2} />
      </LoadingIcon>
      <LoadingText>Loading tasks...</LoadingText>
    </LoadingContainer>
  )
}
