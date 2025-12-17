import styled from 'styled-components'
import { Card } from '~/components/ui'

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 3rem;
`

export const FeatureCard = styled(Card)`
  height: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`

export const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`
