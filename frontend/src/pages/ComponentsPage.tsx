import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { UserProfile } from '@/components/auth/UserProfile'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Eye, 
  Copy,
  LogIn,
  UserPlus,
  Github,
  User,
  Settings
} from 'lucide-react'

export const ComponentsPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('LoginForm')

  const components = [
    {
      name: 'LoginForm',
      icon: LogIn,
      title: 'Login Form',
      description: 'Email and password authentication with customizable styling',
      props: [
        { name: 'onSuccess', type: '(user: User) => void', description: 'Called when login succeeds' },
        { name: 'onError', type: '(error: string) => void', description: 'Called when login fails' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
        { name: 'showCard', type: 'boolean', description: 'Whether to wrap in a card', default: 'true' },
        { name: 'title', type: 'string', description: 'Form title', default: '"Sign in to your account"' },
        { name: 'description', type: 'string', description: 'Form description' }
      ]
    },
    {
      name: 'RegisterForm',
      icon: UserPlus,
      title: 'Register Form',
      description: 'User registration with email, password, and name fields',
      props: [
        { name: 'onSuccess', type: '(user: User) => void', description: 'Called when registration succeeds' },
        { name: 'onError', type: '(error: string) => void', description: 'Called when registration fails' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
        { name: 'showCard', type: 'boolean', description: 'Whether to wrap in a card', default: 'true' },
        { name: 'title', type: 'string', description: 'Form title', default: '"Create your account"' },
        { name: 'description', type: 'string', description: 'Form description' }
      ]
    },
    {
      name: 'OAuthButtons',
      icon: Github,
      title: 'OAuth Buttons',
      description: 'Social authentication buttons for GitHub, Google, and more',
      props: [
        { name: 'onGithubClick', type: '() => void', description: 'Called when GitHub button is clicked' },
        { name: 'onGoogleClick', type: '() => void', description: 'Called when Google button is clicked' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
        { name: 'variant', type: '"default" | "outline"', description: 'Button style variant', default: '"outline"' }
      ]
    },
    {
      name: 'UserProfile',
      icon: User,
      title: 'User Profile',
      description: 'Display user information and account management options',
      props: [
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
        { name: 'showCard', type: 'boolean', description: 'Whether to wrap in a card', default: 'true' }
      ]
    }
  ]

  const getComponentCode = (componentName: string) => {
    const codes = {
      LoginForm: `import { LoginForm } from '@nirva/react'

export default function LoginPage() {
  return (
    <LoginForm
      onSuccess={(user) => {
        console.log('User logged in:', user)
        // Redirect to dashboard
      }}
      onError={(error) => {
        console.error('Login failed:', error)
      }}
      className="max-w-md mx-auto"
    />
  )
}`,
      RegisterForm: `import { RegisterForm } from '@nirva/react'

export default function SignUpPage() {
  return (
    <RegisterForm
      onSuccess={(user) => {
        console.log('User registered:', user)
        // Redirect to onboarding
      }}
      title="Join Nirva"
      description="Create your account to get started"
    />
  )
}`,
      OAuthButtons: `import { OAuthButtons } from '@nirva/react'

export default function SocialAuth() {
  return (
    <OAuthButtons
      onGithubClick={() => {
        // Handle GitHub OAuth
      }}
      onGoogleClick={() => {
        // Handle Google OAuth
      }}
      variant="outline"
    />
  )
}`,
      UserProfile: `import { UserProfile } from '@nirva/react'

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <UserProfile showCard={true} />
    </div>
  )
}`
    }
    return codes[componentName as keyof typeof codes] || ''
  }

  const renderComponentPreview = () => {
    const style = { transform: 'scale(0.9)', transformOrigin: 'top center' }
    
    switch (activeComponent) {
      case 'LoginForm':
        return <div style={style}><LoginForm className="max-w-sm" /></div>
      case 'RegisterForm':
        return <div style={style}><RegisterForm className="max-w-sm" /></div>
      case 'OAuthButtons':
        return <div style={style} className="max-w-sm"><OAuthButtons /></div>
      case 'UserProfile':
        return <div style={style}><UserProfile className="max-w-sm" /></div>
      default:
        return null
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Components</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Pre-built, customizable authentication components ready to drop into your React app.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Component List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="space-y-2 sticky top-8">
              {components.map((component, index) => (
                <motion.button
                  key={component.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  onClick={() => setActiveComponent(component.name)}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                    activeComponent === component.name
                      ? 'bg-primary/10 border-2 border-primary/20'
                      : 'bg-card hover:bg-muted/50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <component.icon className={`h-5 w-5 ${
                      activeComponent === component.name ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <div>
                      <div className={`font-medium text-sm ${
                        activeComponent === component.name ? 'text-primary' : 'text-foreground'
                      }`}>
                        {component.title}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Preview */}
            <motion.section
              key={activeComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        {React.createElement(
                          components.find(c => c.name === activeComponent)?.icon || Eye,
                          { className: "h-4 w-4 text-primary" }
                        )}
                      </div>
                      <div>
                        <CardTitle>
                          {components.find(c => c.name === activeComponent)?.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {components.find(c => c.name === activeComponent)?.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Preview</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                    {renderComponentPreview()}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Code Example */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Code2 className="h-5 w-5 mr-2" />
                      Usage Example
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(getComponentCode(activeComponent))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                      <code>{getComponentCode(activeComponent)}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Props Documentation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Props
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Name</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Default</th>
                          <th className="text-left py-2 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components.find(c => c.name === activeComponent)?.props.map((prop, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 pr-4">
                              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                                {prop.name}
                              </code>
                            </td>
                            <td className="py-2 pr-4 text-sm text-muted-foreground font-mono">
                              {prop.type}
                            </td>
                            <td className="py-2 pr-4 text-sm">
                              {prop.default ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                                  {prop.default}
                                </code>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="py-2 text-sm text-muted-foreground">
                              {prop.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}