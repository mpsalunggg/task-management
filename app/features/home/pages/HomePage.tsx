import { Link } from 'react-router'
import { Button, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui'
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

export function HomePage() {
  const features = [
    {
      icon: '✅',
      title: 'Task Management',
      description: 'Create, update, and track your tasks with ease. Stay organized and productive.',
    },
    {
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'Your data is protected with JWT authentication and secure password hashing.',
    },
    {
      icon: '⚡',
      title: 'Fast & Responsive',
      description: 'Built with modern technologies for a smooth and responsive user experience.',
    },
  ]

  return (
    <LandingContainer>
      <Hero>
        <Title>Task Management System</Title>
        <Subtitle>
          Organize your work, boost your productivity, and achieve your goals with our simple yet
          powerful task management tool.
        </Subtitle>
      </Hero>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <CardHeader>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <CardTitle $size="md">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <CTASection>
        <Link to="/register">
          <Button $size="lg">Get Started</Button>
        </Link>
        <Link to="/login">
          <Button $size="lg" $variant="outline">
            Login
          </Button>
        </Link>
      </CTASection>
    </LandingContainer>
  )
}
