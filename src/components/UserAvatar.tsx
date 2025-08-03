"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/lib/types"

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function UserAvatar({ user, size = 'md', className = "" }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-20 w-20 text-2xl'
  }

  const ringClasses = {
    sm: 'ring-1',
    md: 'ring-2',
    lg: 'ring-2'
  }

  const fallbackFontWeight = {
    sm: 'font-medium',
    md: 'font-semibold',
    lg: 'font-semibold'
  }

  const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random&color=fff&size=${size === 'lg' ? '80' : '40'}`

  return (
    <Avatar className={`${sizeClasses[size]} ${ringClasses[size]} ring-gray-100 ${className}`}>
      <AvatarImage 
        src={avatarUrl} 
        alt={user.name || 'User'} 
      />
      <AvatarFallback className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white ${fallbackFontWeight[size]}`}>
        {user.name?.charAt(0)?.toUpperCase() || 'U'}
      </AvatarFallback>
    </Avatar>
  )
} 