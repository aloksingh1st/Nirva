import React from 'react'
import { Button } from '@/components/ui/button'
import { Github, Chrome } from 'lucide-react'
import { motion } from 'framer-motion'

interface OAuthButtonsProps {
  onGithubClick?: () => void
  onGoogleClick?: () => void
  className?: string
  variant?: 'default' | 'outline'
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({
  onGithubClick,
  onGoogleClick,
  className = '',
  variant = 'outline'
}) => {
  const handleGithubClick = () => {
    onGithubClick?.()
    // Mock OAuth flow
    console.log('GitHub OAuth initiated')
  }

  const handleGoogleClick = () => {
    onGoogleClick?.()
    // Mock OAuth flow
    console.log('Google OAuth initiated')
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          type="button"
          variant={variant}
          className="w-full"
          onClick={handleGithubClick}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          type="button"
          variant={variant}
          className="w-full"
          onClick={handleGoogleClick}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
      </motion.div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
    </div>
  )
}