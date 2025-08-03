"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { validateEmail, validatePassword, validatePasswordConfirmation, validateName } from '@/lib/validation'
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator'
import PasswordRequirements from '@/components/PasswordRequirements'
import PasswordInput from '@/components/PasswordInput'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  
  const { register } = useAuth()
  const { toast, dismiss } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const nameValidation = validateName(name)
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    const confirmPasswordValidation = validatePasswordConfirmation(password, confirmPassword)
    
    if (!nameValidation.isValid) {
      dismiss()
      toast({
        title: "Error",
        description: nameValidation.message,
        variant: "destructive",
      })
      return
    }
    
    if (!emailValidation.isValid) {
      dismiss()
      toast({
        title: "Error",
        description: emailValidation.message,
        variant: "destructive",
      })
      return
    }
    
    if (!passwordValidation.isValid) {
      dismiss()
      toast({
        title: "Error",
        description: passwordValidation.message,
        variant: "destructive",
      })
      return
    }
    
    if (!confirmPasswordValidation.isValid) {
      dismiss()
      toast({
        title: "Error",
        description: confirmPasswordValidation.message,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      await register({ name, email, password, confirmPassword })
      
      // Wait a bit to ensure user state is updated
      await new Promise(resolve => setTimeout(resolve, 100))
      
      dismiss()
      toast({
        title: "Success",
        description: "Account created and logged in successfully!",
      })
      
      router.push('/')
    } catch (error: any) {
      
      let errorMessage = "Registration failed"
      
      if (error.message.includes("Email đã tồn tại")) {
        errorMessage = "This email is already registered. Please use a different email or try logging in."
      } else if (error.message.includes("Email")) {
        errorMessage = error.message
      } else if (error.message.includes("Failed to get user data")) {
        errorMessage = "Registration successful but failed to get user data. Please try logging in."
      } else if (error.message.includes("Authentication failed")) {
        errorMessage = "Registration successful but authentication failed. Please try logging in."
      }
      
      // Clear any existing toasts before showing new one
      dismiss()
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {name && !validateName(name).isValid && (
                  <p className="text-xs text-red-500">{validateName(name).message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {email && !validateEmail(email).isValid && (
                  <p className="text-xs text-red-500">{validateEmail(email).message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(value) => {
                    setPassword(value)
                    setShowPasswordRequirements(true)
                  }}
                  required
                />
                {password && (
                  <div className="space-y-2">
                    <PasswordStrengthIndicator password={password} />
                    {showPasswordRequirements && (
                      <PasswordRequirements password={password} />
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  required
                />
                {confirmPassword && !validatePasswordConfirmation(password, confirmPassword).isValid && (
                  <p className="text-xs text-red-500">{validatePasswordConfirmation(password, confirmPassword).message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
