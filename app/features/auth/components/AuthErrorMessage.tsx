import styled from 'styled-components'

export const AuthErrorMessage = styled.div`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`
