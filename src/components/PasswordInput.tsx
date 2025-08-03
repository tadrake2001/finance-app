"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
}

export default function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  required = false,
  className = ""
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`pr-10 ${className}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 transition-colors"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
      </Button>
    </div>
  )
} 