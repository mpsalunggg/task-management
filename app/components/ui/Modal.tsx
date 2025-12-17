import { useEffect } from 'react'
import styled from 'styled-components'
import { X } from 'lucide-react'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`

const ModalBody = styled.div`
  padding: 1.5rem;
`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>
  )
}
