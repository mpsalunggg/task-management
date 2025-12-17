import styled from 'styled-components'

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.background.primary};
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`
