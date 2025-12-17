import styled from 'styled-components'

export const AuthFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`
