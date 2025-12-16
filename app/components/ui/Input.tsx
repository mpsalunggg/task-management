import styled from 'styled-components'

interface InputProps {
  $hasError?: boolean
  $fullWidth?: boolean
}

export const Input = styled.input<InputProps>`
  border: none;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease-in-out;

  padding: 0.45rem 1rem;
  font-size: 1rem;

  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  border: 2px solid ${(props) => (props.$hasError ? '#ef4444' : '#e5e7eb')};
  border-radius: 0.5rem;

  background-color: white;

  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${(props) => (props.$hasError ? '#ef4444' : '#3b82f6')};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${(props) => (props.$hasError ? '#ef4444' : '#d1d5db')};
  }
`

Input.defaultProps = {
  $hasError: false,
  $fullWidth: true,
}

export const InputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`

export const InputError = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.5rem;
`

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`
