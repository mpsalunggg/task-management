import styled from 'styled-components'

interface TextAreaProps {
  $hasError?: boolean
}

export const TextArea = styled.textarea<TextAreaProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.background.primary};
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ $hasError, theme }) =>
        $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.gray[300]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
    opacity: 0.6;
  }
`

TextArea.defaultProps = {
  $hasError: false,
}
