import styled from 'styled-components'

export const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin: 0 0 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 0;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`
