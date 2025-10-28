import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { motion } from 'framer-motion'
import { 
  Play, 
  Code2, 
  Copy, 
  Settings, 
  Palette,
  Eye,
  Download,
  Zap
} from 'lucide-react'

export const PlaygroundPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('login')
  const [config, setConfig] = useState({
    showCard: true,
    title: 'Sign in to your account',
    description: 'Enter your credentials to access your account',
    variant: 'default' as 'default' | 'outline',
    className: 'max-w-md mx-auto'
  })

  const components = [
    { id: 'login', name: 'Login Form', icon: '🔐' },
    { id: 'register', name: 'Register Form', icon: '✨' },
    { id: 'oauth', name: 'OAuth Buttons', icon: '🚀' }
  ]

  const generateCode = () => {
    const componentMap = {
      login: `<LoginForm
  onSuccess={(user) => console.log('Logged in:', user)}
  showCard={${config.showCard}}
  title="${config.title}"
  description="${config.description}"
  className="${config.className}"
/>`,
      register: `<RegisterForm
  onSuccess={(user) => console.log('Registered:', user)}
  showCard={${config.showCard}}
  title="${config.title}"
  description="${config.description}"
  className="${config.className}"
/>`,
      oauth: `<OAuthButtons
  onGithubClick={() => console.log('GitHub OAuth')}
  onGoogleClick={() => console.log('Google OAuth')}
  variant="${config.variant}"
  className="${config.className}"
/>`
    }
    
    return componentMap[activeComponent as keyof typeof componentMap] || ''
  }

  const renderComponent = () => {
    const commonProps = {
      className: config.className,
      showCard: config.showCard,
      title: config.title,
      description: config.description
    }

    switch (activeComponent) {
      case 'login':
        return <LoginForm {...commonProps} onSuccess={() => console.log('Demo login')} />
      case 'register':
        return <RegisterForm {...commonProps} onSuccess={() => console.log('Demo register')} />
      case 'oauth':
        return (
          <div className={config.className}>
            <OAuthButtons 
              variant={config.variant}
              onGithubClick={() => console.log('GitHub demo')}
              onGoogleClick={() => console.log('Google demo')}
            />
          </div>
        )
      default:
        return null
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportConfig = () => {
    const configExport = {
      component: activeComponent,
      config,
      code: generateCode()
    }
    
    const blob = new Blob([JSON.stringify(configExport, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nirva-${activeComponent}-config.json`
    a.click()
    URL.revokeObjectURL(url)
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
            <Play className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Playground</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Experiment with Nirva components and customize them to match your brand.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Component Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2" />
                  Component
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveComponent(comp.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      activeComponent === comp.id
                        ? 'bg-primary/10 border-2 border-primary/20 text-primary'
                        : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{comp.icon}</span>
                      <span className="font-medium">{comp.name}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings className="h-5 w-5 mr-2" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    placeholder="Component title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={config.description}
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    placeholder="Component description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="className">CSS Classes</Label>
                  <Input
                    id="className"
                    value={config.className}
                    onChange={(e) => setConfig({ ...config, className: e.target.value })}
                    placeholder="Tailwind CSS classes"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showCard">Show Card</Label>
                  <Switch
                    id="showCard"
                    checked={config.showCard}
                    onCheckedChange={(checked) => setConfig({ ...config, showCard: checked })}
                  />
                </div>

                {activeComponent === 'oauth' && (
                  <div className="space-y-2">
                    <Label>Button Variant</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={config.variant === 'default' ? 'default' : 'outline'}
                        onClick={() => setConfig({ ...config, variant: 'default' })}
                      >
                        Default
                      </Button>
                      <Button
                        size="sm"
                        variant={config.variant === 'outline' ? 'default' : 'outline'}
                        onClick={() => setConfig({ ...config, variant: 'outline' })}
                      >
                        Outline
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Download className="h-5 w-5 mr-2" />
                  Export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={exportConfig}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Config
                </Button>
                <Button
                  onClick={() => copyToClipboard(generateCode())}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview & Code */}
          <div className="lg:col-span-3 space-y-8">
            {/* Live Preview */}
            <motion.section
              key={activeComponent + JSON.stringify(config)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Live Preview
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Live</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-12 flex items-center justify-center min-h-[500px]">
                    <div className="w-full max-w-lg">
                      {renderComponent()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Generated Code */}
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
                      Generated Code
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generateCode())}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-lg p-6">
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                      <code>{generateCode()}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Integration Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Ready to integrate this component into your app?
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">1. Install the SDK</h4>
                        <code className="block bg-slate-900 text-slate-300 p-2 rounded text-sm font-mono">
                          npm install @nirva/react
                        </code>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">2. Setup Provider</h4>
                        <code className="block bg-slate-900 text-slate-300 p-2 rounded text-sm font-mono">
                          &lt;NirvaProvider apiKey="..." /&gt;
                        </code>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button size="sm">
                        Get API Key
                      </Button>
                      <Button size="sm" variant="outline">
                        View Full Docs
                      </Button>
                    </div>
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