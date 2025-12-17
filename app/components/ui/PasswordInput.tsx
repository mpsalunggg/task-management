import { useState, forwardRef } from 'react'
import styled from 'styled-components'
import { Eye, EyeOff } from 'lucide-react'

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input<{ $hasError?: boolean }>`
  border: none;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease-in-out;

  padding: 0.75rem 3rem 0.75rem 1rem;
  width: 100%;

  font-size: ${({ theme }) => theme.fontSize.base};
  border: 1px solid
    ${(props) =>
      props.$hasError
        ? props.theme.colors.danger
        : props.theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[900]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:focus {
    border-color: ${(props) =>
      props.$hasError ? props.theme.colors.danger : props.theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError
          ? 'rgba(239, 68, 68, 0.1)'
          : 'rgba(59, 130, 246, 0.1)'};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${(props) =>
      props.$hasError ? props.theme.colors.danger : props.theme.colors.gray[300]};
  }
`

const ToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ $hasError, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev)
    }

    return (
      <PasswordInputWrapper>
        <StyledInput
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          $hasError={$hasError}
          disabled={disabled}
          {...props}
        />
        <ToggleButton
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </ToggleButton>
      </PasswordInputWrapper>
    )
  }
)
