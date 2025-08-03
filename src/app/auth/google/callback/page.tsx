"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GoogleCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const { googleLogin } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        toast({
          title: "Error",
          description: "Google login failed. Please try again.",
          variant: "destructive",
        })
        router.push('/auth/login')
        return
      }

      if (!code) {
        toast({
          title: "Error",
          description: "No authorization code received from Google.",
          variant: "destructive",
        })
        router.push('/auth/login')
        return
      }

      try {
        await googleLogin(code)
        toast({
          title: "Success",
          description: "Logged in with Google successfully",
        })
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

    handleCallback()
  }, [searchParams, googleLogin, toast, router])

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