"use client"

import { validatePassword } from "@/lib/validation"
import { Check, X } from "lucide-react"

interface PasswordRequirementsProps {
  password: string
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const validation = validatePassword(password)

  const requirements = [
    {
      label: 'At least 8 characters',
      met: validation.hasMinLength
    },
    {
      label: 'One uppercase letter',
      met: validation.hasUppercase
    },
    {
      label: 'One lowercase letter',
      met: validation.hasLowercase
    },
    {
      label: 'One number',
      met: validation.hasNumber
    },
    {
      label: 'One special character',
      met: validation.hasSpecialChar
    }
  ]

  if (!password) return null

  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-600 font-medium">Password requirements:</p>
      <div className="space-y-1">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center space-x-2">
            {requirement.met ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs ${requirement.met ? 'text-green-600' : 'text-red-600'}`}>
              {requirement.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 