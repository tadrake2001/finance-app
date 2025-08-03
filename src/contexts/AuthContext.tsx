"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'
import { User, LoginCredentials, RegisterCredentials, AuthContextType } from '@/lib/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Debug: Log user state changes
  useEffect(() => {
    console.log('AuthContext: User state changed:', user)
  }, [user])

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token')
        
        if (token) {
          const response = await apiClient.getCurrentUser()
          
          if (response.statusCode === 200 && response.data) {
            setUser(response.data)
          } else {
            localStorage.removeItem('access_token')
          }
        }
      } catch (error) {
        localStorage.removeItem('access_token')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.login(credentials)
      
      if (response.statusCode === 201 && response.data?.access_token) {
        // Get user data using the access token
        const userResponse = await apiClient.getCurrentUser()
        
        if (userResponse.statusCode === 200 && userResponse.data) {
          setUser(userResponse.data)
        } else {
          throw new Error('Failed to get user data after login')
        }
        
        return Promise.resolve()
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const googleLogin = async (code: string) => {
    try {
      const response = await apiClient.googleLogin(code)
      
      if (response.statusCode === 201 && response.data?.access_token) {
        // Get user data using the access token
        const userResponse = await apiClient.getCurrentUser()
        
        if (userResponse.statusCode === 200 && userResponse.data) {
          setUser(userResponse.data)
        } else {
          throw new Error('Failed to get user data after Google login')
        }
        
        return Promise.resolve()
      } else {
        throw new Error(response.message || 'Google login failed')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      console.log('AuthContext: Starting registration...')
      const response = await apiClient.register(credentials)
      console.log('AuthContext: Registration response:', response)
      
      if (response.statusCode === 201) {
        console.log('AuthContext: Registration successful')
        
        console.log('AuthContext: Registration successful, auto-login to get tokens...')
        
        // Auto-login to get tokens
        try {
          const loginResponse = await apiClient.login({
            email: credentials.email,
            password: credentials.password
          })
          
          if (loginResponse.statusCode === 201 && loginResponse.data?.access_token) {
            // Get full user data with tokens
            const userResponse = await apiClient.getCurrentUser()
            
            if (userResponse.statusCode === 200 && userResponse.data) {
              setUser(userResponse.data)
            } else {
              // Fallback to basic user data
              const userData = {
                _id: response.data?._id || '',
                name: credentials.name,
                email: credentials.email,
                avatar: ''
              }
              setUser(userData)
            }
          } else {
            // Fallback to basic user data
            const userData = {
              _id: response.data?._id || '',
              name: credentials.name,
              email: credentials.email,
              avatar: ''
            }
            setUser(userData)
          }
        } catch (loginError) {
          // Fallback to basic user data
          const userData = {
            _id: response.data?._id || '',
            name: credentials.name,
            email: credentials.email,
            avatar: ''
          }
          setUser(userData)
        }
        
        return Promise.resolve()
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
  }

  const setUserDirectly = (userData: User) => {
    setUser(userData)
  }

  const value: AuthContextType = {
    user,
    login,
    googleLogin,
    register,
    logout,
    loading,
    setUserDirectly,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
