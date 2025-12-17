import styled from 'styled-components'

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: 1rem;
`
