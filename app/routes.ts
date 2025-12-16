import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('login', 'routes/auth/login.tsx'),
  route('register', 'routes/auth/register.tsx'),

  route('api/auth/register', 'routes/api/auth/register.ts'),
  route('api/auth/login', 'routes/api/auth/login.ts'),

  route('api/tasks', 'routes/api/task/tasks.ts'),
  route('api/task/:id', 'routes/api/task/task.$id.ts'),
] satisfies RouteConfig
