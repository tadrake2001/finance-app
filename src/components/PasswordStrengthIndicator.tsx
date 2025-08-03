"use client"

import { getPasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from "@/lib/validation"

interface PasswordStrengthIndicatorProps {
  password: string
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = getPasswordStrength(password)
  const color = getPasswordStrengthColor(strength)
  const text = getPasswordStrengthText(strength)

  if (!password) return null

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div 
          className={`h-1 w-8 rounded-full transition-colors ${
            strength === 'weak' ? 'bg-red-500' : 
            strength === 'medium' ? 'bg-yellow-500' : 
            'bg-green-500'
          }`}
        />
        <div 
          className={`h-1 w-8 rounded-full transition-colors ${
            strength === 'weak' ? 'bg-gray-300' : 
            strength === 'medium' ? 'bg-yellow-500' : 
            'bg-green-500'
          }`}
        />
        <div 
          className={`h-1 w-8 rounded-full transition-colors ${
            strength === 'weak' ? 'bg-gray-300' : 
            strength === 'medium' ? 'bg-gray-300' : 
            'bg-green-500'
          }`}
        />
      </div>
      <span className={`text-xs font-medium ${color}`}>
        {text}
      </span>
    </div>
  )
} 