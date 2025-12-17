import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router'
import {
  Button,
  Input,
  PasswordInput,
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
  AuthFooter,
} from '../components'

interface LoginFormData {
  username: string
  password: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setApiError(null)

      const response = await authServices.login(data)

      if (response.success) {
        navigate('/')
      } else {
        setApiError(response.error || 'Login failed')
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
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AuthForm onSubmit={handleSubmit(onSubmit)}>
            {apiError && <AuthErrorMessage>{apiError}</AuthErrorMessage>}

            <InputGroup>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                $hasError={!!errors.username}
                $fullWidth
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
              />
              {errors.username && (
                <InputError>{errors.username.message}</InputError>
              )}
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="password">Password</InputLabel>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                $hasError={!!errors.password}
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

            <Button type="submit" $fullWidth disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </AuthForm>

          <AuthFooter>
            Don't have an account? <Link to="/register">Register here</Link>
          </AuthFooter>
        </CardContent>
      </AuthCard>
    </AuthContainer>
  )
}
