import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code2, 
  Zap, 
  Shield, 
  Palette, 
  ArrowRight,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react'

export const DocsPage: React.FC = () => {
  const location = useLocation()

  const quickStart = [
    {
      title: "Install the SDK",
      description: "Get started with npm or yarn",
      code: "npm install @nirva/react",
      time: "30 seconds"
    },
    {
      title: "Setup Provider",
      description: "Wrap your app with NirvaProvider",
      code: "<NirvaProvider apiKey='your-key'>",
      time: "1 minute"
    },
    {
      title: "Add Auth Components",
      description: "Drop in login and register forms",
      code: "<LoginForm />",
      time: "2 minutes"
    }
  ]

  const guides = [
    {
      icon: Zap,
      title: "Quick Start",
      description: "Get up and running with Nirva in under 5 minutes",
      href: "/docs/getting-started",
      badge: "Popular"
    },
    {
      icon: Code2,
      title: "Components",
      description: "Pre-built auth components ready to use",
      href: "/docs/components",
      badge: "Essential"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Understanding Nirva's security features",
      href: "/docs/security"
    },
    {
      icon: Palette,
      title: "Customization",
      description: "Theming and styling your auth components",
      href: "/docs/customization"
    }
  ]

  const features = [
    "TypeScript support out of the box",
    "Customizable themes and styling",
    "Built-in form validation",
    "Social OAuth providers",
    "Multi-factor authentication",
    "Session management",
    "Webhook integrations",
    "Analytics and monitoring"
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to integrate Nirva authentication into your application.
          </p>
        </motion.div>

        {/* Quick Start Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Get Started in Minutes</h2>
            <p className="text-muted-foreground">
              Follow these simple steps to add authentication to your app
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {quickStart.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Card className="relative p-6 h-full">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{step.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <code className="text-sm text-slate-300 font-mono">{step.code}</code>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Guides */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-8">Explore the Docs</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="group"
              >
                <Link to={guide.href || '#'}>
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden">
                    {guide.badge && (
                      <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {guide.badge}
                      </div>
                    )}
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <guide.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{guide.description}</p>
                      <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                        Read guide <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <p className="text-muted-foreground mb-6">
                  Nirva comes packed with features to handle every authentication scenario.
                </p>
                <div className="space-y-3">
                  {features.slice(0, 4).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
                <p className="text-muted-foreground mb-6">
                  Scale with enterprise-grade security and customization options.
                </p>
                <div className="space-y-3">
                  {features.slice(4).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Community & Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                Join our community of developers or reach out to our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  Join Discord Community
                </Button>
                <Button>
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}