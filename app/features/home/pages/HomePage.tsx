import { Link, useNavigate } from 'react-router'
import {
  Button,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui'
import { isAuthenticated } from '~/lib/auth'
import { removeToken } from '~/lib/token'
import {
  LandingContainer,
  Hero,
  Title,
  Subtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  CTASection,
} from '../components'
import { FEATURES } from '../home.constants'

export function HomePage() {
  const authenticated = isAuthenticated()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <LandingContainer>
      <Hero>
        <Title>Task Management System</Title>
        <Subtitle>
          Organize your work, boost your productivity, and achieve your goals
          with our simple yet powerful task management tool
        </Subtitle>
      </Hero>

      <FeaturesGrid>
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon
          return (
            <FeatureCard key={index}>
              <CardHeader>
                <FeatureIcon>
                  <Icon size={32} strokeWidth={1.5} />
                </FeatureIcon>
                <CardTitle $size="md">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </FeatureCard>
          )
        })}
      </FeaturesGrid>

      <CTASection>
        {authenticated ? (
          <>
            <Link to="/task">
              <Button $size="lg">Mulai</Button>
            </Link>
            <Button $size="lg" $variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button $size="lg" $variant="outline">
              Login
            </Button>
          </Link>
        )}
      </CTASection>
    </LandingContainer>
  )
}
