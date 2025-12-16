import styled from 'styled-components'

interface CardProps {
  $padding?: 'sm' | 'md' | 'lg'
  $shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = styled.div<CardProps>`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;

  padding: ${(props) => {
    switch (props.$padding) {
      case 'sm':
        return '1rem'
      case 'lg':
        return '2rem'
      default:
        return '1.5rem'
    }
  }};

  box-shadow: ${(props) => {
    switch (props.$shadow) {
      case 'none':
        return 'none'
      case 'sm':
        return '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      case 'lg':
        return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      default:
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }
  }};

  transition: box-shadow 0.2s ease-in-out;
`

Card.defaultProps = {
  $padding: 'md',
  $shadow: 'md',
}

export const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`

export const CardTitle = styled.h2<{
  $size?: 'sm' | 'md' | 'lg'
  $color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'light'
    | 'dark'
}>`
  color: ${(props) => {
    switch (props.$color) {
      case 'secondary':
        return '#6b7280'
      default:
        return '#3b82f6'
    }
  }};
  font-size: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return '1.25rem'
      case 'md':
        return '1.5rem'
      case 'lg':
        return '1.75rem'
      default:
        return '2rem'
    }
  }};
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5rem;
`

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`

export const CardContent = styled.div``

export const CardFooter = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`
