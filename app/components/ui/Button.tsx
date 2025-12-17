import styled from 'styled-components'

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  $size?: 'sm' | 'md' | 'lg'
  $fullWidth?: boolean
}

export const Button = styled.button<ButtonProps>`
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease-in-out;

  padding: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return '0.375rem 0.75rem'
      case 'lg':
        return '0.875rem 1.75rem'
      default:
        return '0.625rem 1.25rem'
    }
  }};

  font-size: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return '0.8125rem'
      case 'lg':
        return '1rem'
      default:
        return '0.9375rem'
    }
  }};

  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  border-radius: 0.5rem;

  font-weight: 600;

  ${(props) => {
    switch (props.$variant) {
      case 'secondary':
        return `
          background-color: #6b7280;
          color: white;

          &:hover:not(:disabled) {
            background-color: #4b5563;
          }

          &:active:not(:disabled) {
            background-color: #374151;
          }
        `
      case 'danger':
        return `
          background-color: #ef4444;
          color: white;

          &:hover:not(:disabled) {
            background-color: #dc2626;
          }

          &:active:not(:disabled) {
            background-color: #b91c1c;
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;

          &:hover:not(:disabled) {
            background-color: #eff6ff;
          }

          &:active:not(:disabled) {
            background-color: #dbeafe;
          }
        `
      default:
        return `
          background-color: #3b82f6;
          color: white;

          &:hover:not(:disabled) {
            background-color: #2563eb;
          }

          &:active:not(:disabled) {
            background-color: #1d4ed8;
          }
        `
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

Button.defaultProps = {
  $variant: 'primary',
  $size: 'md',
  $fullWidth: false,
}
