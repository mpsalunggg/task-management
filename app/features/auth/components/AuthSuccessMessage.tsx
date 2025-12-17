import styled from 'styled-components'

export const AuthSuccessMessage = styled.div`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.successLight};
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`
