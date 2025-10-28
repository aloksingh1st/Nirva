import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  Terminal, 
  Code2, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  ArrowRight,
  Clock,
  AlertCircle
} from 'lucide-react'

export const GettingStartedPage: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const steps = [
    {
      title: "Installation",
      description: "Install the Nirva React SDK",
      time: "30 seconds",
      code: `npm install @nirva/react
# or
yarn add @nirva/react`,
      language: "bash"
    },
    {
      title: "Get API Key",
      description: "Create an account and get your API key",
      time: "2 minutes",
      code: `# Visit https://dashboard.nirva.dev
# Create a new project
# Copy your API key from the dashboard`,
      language: "bash"
    },
    {
      title: "Setup Provider",
      description: "Wrap your app with the Nirva provider",
      time: "1 minute",
      code: `import { NirvaProvider } from '@nirva/react'

export default function App() {
  return (
    <NirvaProvider apiKey={process.env.NEXT_PUBLIC_NIRVA_API_KEY}>
      {/* Your app components */}
    </NirvaProvider>
  )
}`,
      language: "jsx"
    },
    {
      title: "Add Auth Components",
      description: "Drop in login and registration forms",
      time: "2 minutes",
      code: `import { LoginForm, RegisterForm } from '@nirva/react'

export default function AuthPage() {
  return (
    <div>
      <LoginForm 
        onSuccess={() => console.log('User logged in!')}
        className="max-w-md mx-auto"
      />
      
      <RegisterForm
        onSuccess={() => console.log('User registered!')}
        className="max-w-md mx-auto"
      />
    </div>
  )
}`,
      language: "jsx"
    }
  ]

  const examples = [
    {
      title: "Basic Login Form",
      description: "Simple login with email and password",
      code: `<LoginForm 
  onSuccess={(user) => {
    console.log('Welcome,', user.name)
    router.push('/dashboard')
  }}
  onError={(error) => {
    console.error('Login failed:', error)
  }}
/>`
    },
    {
      title: "Custom Styling",
      description: "Override default styles with Tailwind",
      code: `<LoginForm 
  className="bg-gray-50 p-8 rounded-xl"
  showCard={false}
  title="Welcome Back"
  description="Sign in to continue"
/>`
    },
    {
      title: "With OAuth",
      description: "Add social login options",
      code: `<div>
  <OAuthButtons 
    onGithubClick={() => console.log('GitHub OAuth')}
    onGoogleClick={() => console.log('Google OAuth')}
  />
  <LoginForm showCard={false} />
</div>`
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
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
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-xl text-muted-foreground">
            Get Nirva authentication up and running in your React app in under 5 minutes.
          </p>
        </motion.div>

        {/* Prerequisites */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Prerequisites
                  </h3>
                  <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
                    <li>• React 16.8+ (hooks support required)</li>
                    <li>• Node.js 14+ and npm or yarn</li>
                    <li>• A Nirva account (free to get started)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-lg p-4 relative group">
                    <button
                      onClick={() => copyToClipboard(step.code)}
                      className="absolute top-3 right-3 p-2 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Common Examples</h2>
          
          <div className="space-y-6">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 rounded-lg p-4 relative group">
                      <button
                        onClick={() => copyToClipboard(example.code)}
                        className="absolute top-3 right-3 p-2 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">You're All Set!</h3>
              <p className="text-muted-foreground mb-6">
                Your authentication is now configured. Here's what you can explore next:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col">
                  <Terminal className="h-6 w-6 mb-2" />
                  <span className="font-medium">Try the Playground</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Test components live
                  </span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col">
                  <Code2 className="h-6 w-6 mb-2" />
                  <span className="font-medium">Component Docs</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Learn all features
                  </span>
                </Button>
                <Button className="h-auto p-4 flex flex-col">
                  <ExternalLink className="h-6 w-6 mb-2" />
                  <span className="font-medium">Dashboard</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Manage your apps
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}