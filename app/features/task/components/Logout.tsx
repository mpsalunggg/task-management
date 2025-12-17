import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui'
import { removeToken } from '~/lib/token'

export function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <Button onClick={handleLogout} $variant="outline">
      <LogOut size={20} style={{ marginRight: '0.5rem' }} />
      Logout
    </Button>
  )
}
