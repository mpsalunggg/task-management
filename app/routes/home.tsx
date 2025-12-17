import { HomePage } from '~/features/home/pages'

export function meta() {
  return [
    { title: 'Task Management - Organize Your Work' },
    {
      name: 'description',
      content:
        'Manage your tasks efficiently with our simple and powerful task management system',
    },
  ]
}

export const clientLoader = async () => {
  return null
}

export default function Home() {
  return <HomePage />
}
