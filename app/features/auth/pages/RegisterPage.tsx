import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router'
import {
  Button,
  Input,
  InputLabel,
  InputError,
  InputGroup,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui'
import { authServices } from '~/services/auth.services'
import {
  AuthContainer,
  AuthCard,
  AuthForm,
  AuthErrorMessage,
  AuthSuccessMessage,
  AuthFooter,
} from '../components'

interface RegisterFormData {
  username: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      setApiError(null)
      setSuccessMessage(null)

      const { confirmPassword, ...registerData } = data

      const response = await authServices.register(registerData)

      if (response.success) {
        setSuccessMessage('Registration successful! Redirecting to login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setApiError(response.error || 'Registration failed')
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContainer>
      <AuthCard>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <AuthForm onSubmit={handleSubmit(onSubmit)}>
            {apiError && <AuthErrorMessage>{apiError}</AuthErrorMessage>}
            {successMessage && (
              <AuthSuccessMessage>{successMessage}</AuthSuccessMessage>
            )}

            <InputGroup>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                $hasError={!!errors.username}
                $fullWidth
                disabled={isLoading}
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      'Username can only contain letters, numbers, and underscores',
                  },
                })}
              />
              {errors.username && (
                <InputError>{errors.username.message}</InputError>
              )}
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                $hasError={!!errors.email}
                $fullWidth
                disabled={isLoading}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <InputError>{errors.email.message}</InputError>}
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                $hasError={!!errors.name}
                $fullWidth
                disabled={isLoading}
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
              {errors.name && <InputError>{errors.name.message}</InputError>}
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                $hasError={!!errors.password}
                $fullWidth
                disabled={isLoading}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <InputError>{errors.password.message}</InputError>
              )}
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                $hasError={!!errors.confirmPassword}
                $fullWidth
                disabled={isLoading}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <InputError>{errors.confirmPassword.message}</InputError>
              )}
            </InputGroup>

            <Button type="submit" $fullWidth disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>
          </AuthForm>

          <AuthFooter>
            Already have an account? <Link to="/login">Login here</Link>
          </AuthFooter>
        </CardContent>
      </AuthCard>
    </AuthContainer>
  )
}
