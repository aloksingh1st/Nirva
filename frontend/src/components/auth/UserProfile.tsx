import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { LogOut, User, Mail, Shield } from 'lucide-react'

interface UserProfileProps {
  className?: string
  showCard?: boolean
}

export const UserProfile: React.FC<UserProfileProps> = ({
  className = '',
  showCard = true
}) => {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  const profileContent = (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Mail className="mr-1 h-3 w-3" />
            {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 text-sm">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Account Verified</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <User className="h-4 w-4 text-blue-600" />
          <span>Member since {new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  if (!showCard) {
    return <div className={className}>{profileContent}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profileContent}
        </CardContent>
      </Card>
    </motion.div>
  )
}