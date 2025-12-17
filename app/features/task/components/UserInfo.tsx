import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getCurrentUser } from '~/lib/auth'

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const Username = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

export function UserInfo() {
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setUsername(user.username)
    }
  }, [])

  if (!username) return null

  return (
    <UserInfoContainer>
      <Username>Hi, {username}</Username>
    </UserInfoContainer>
  )
}
