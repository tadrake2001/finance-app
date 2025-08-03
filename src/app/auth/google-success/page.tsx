"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GoogleSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const { setUserDirectly } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleGoogleSuccess = async () => {
      const accessToken = searchParams.get('access_token')
      const userId = searchParams.get('user_id')
      const userName = searchParams.get('user_name')
      const userEmail = searchParams.get('user_email')
      const userAvatar = searchParams.get('user_avatar')

      if (!accessToken) {
        toast({
          title: "Error",
          description: "No access token received from Google login",
          variant: "destructive",
        })
        router.push('/auth/login')
        return
      }

      try {
        // Store the token
        localStorage.setItem('access_token', accessToken)
        console.log('GoogleSuccessPage: access_token saved to localStorage:', accessToken.substring(0, 20) + '...')
        
        // Create user object from URL parameters
        const user = {
          _id: userId || '',
          email: userEmail || '',
          name: decodeURIComponent(userName || '').replace('undefined', '').trim(),
          avatar: userAvatar || '', // Will be updated from API call
        }

        // Update auth context
        setUserDirectly(user)
        
        toast({
          title: "Success",
          description: "Logged in with Google successfully",
        })
        
        // Redirect to home page
        router.push('/')
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Google login failed",
          variant: "destructive",
        })
        router.push('/auth/login')
      } finally {
        setIsProcessing(false)
      }
    }

    handleGoogleSuccess()
  }, [searchParams, toast, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Processing Google Login</CardTitle>
            <CardDescription className="text-center">
              Please wait while we complete your Google login...
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {isProcessing && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 