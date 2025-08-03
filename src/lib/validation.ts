export interface ValidationResult {
  isValid: boolean
  message: string
}

export interface PasswordValidationResult extends ValidationResult {
  hasMinLength: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

/**
 * Validate email format with comprehensive checks
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return {
      isValid: false,
      message: 'Email is required'
    }
  }

  // Trim whitespace
  const trimmedEmail = email.trim()
  
  if (trimmedEmail.length === 0) {
    return {
      isValid: false,
      message: 'Email is required'
    }
  }

  // Check email length
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      message: 'Email address is too long (maximum 254 characters)'
    }
  }

  // More comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    }
  }

  // Check for common invalid patterns
  const invalidPatterns = [
    /^\./, // Starts with dot
    /\.$/, // Ends with dot
    /\.\./, // Contains consecutive dots
    /@\./, // @ followed by dot
    /\.@/, // Dot followed by @
    /^@/, // Starts with @
    /@$/, // Ends with @
    /@@/, // Contains @@
    /\s/, // Contains whitespace
  ]

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedEmail)) {
      return {
        isValid: false,
        message: 'Please enter a valid email address'
      }
    }
  }

  // Check domain part
  const parts = trimmedEmail.split('@')
  if (parts.length !== 2) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    }
  }

  const domain = parts[1]
  
  // Check domain length
  if (domain.length > 253) {
    return {
      isValid: false,
      message: 'Email domain is too long'
    }
  }

  // Check for valid domain format
  const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!domainRegex.test(domain)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    }
  }

  // Check for valid TLD (Top Level Domain)
  const tldRegex = /\.[a-zA-Z]{2,}$/
  if (!tldRegex.test(domain)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

/**
 * Validate password strength with comprehensive checks
 */
export function validatePassword(password: string): PasswordValidationResult {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
      hasMinLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false
    }
  }

  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar

  let message = ''
  if (!isValid) {
    const requirements = []
    if (!hasMinLength) requirements.push('at least 8 characters')
    if (!hasUppercase) requirements.push('one uppercase letter')
    if (!hasLowercase) requirements.push('one lowercase letter')
    if (!hasNumber) requirements.push('one number')
    if (!hasSpecialChar) requirements.push('one special character')
    
    message = `Password must contain ${requirements.join(', ')}`
  }

  return {
    isValid,
    message,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar
  }
}

/**
 * Validate password confirmation
 */
export function validatePasswordConfirmation(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return {
      isValid: false,
      message: 'Please confirm your password'
    }
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: 'Passwords do not match'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

/**
 * Validate name with comprehensive checks
 */
export function validateName(name: string): ValidationResult {
  if (!name) {
    return {
      isValid: false,
      message: 'Name is required'
    }
  }

  // Trim whitespace
  const trimmedName = name.trim()
  
  if (trimmedName.length === 0) {
    return {
      isValid: false,
      message: 'Name is required'
    }
  }

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      message: 'Name must be at least 2 characters long'
    }
  }

  if (trimmedName.length > 50) {
    return {
      isValid: false,
      message: 'Name must be less than 50 characters'
    }
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes, dots)
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-'\.]+$/
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      message: 'Name can only contain letters, spaces, hyphens, apostrophes, and dots'
    }
  }

  // Check for consecutive spaces
  if (/\s{2,}/.test(trimmedName)) {
    return {
      isValid: false,
      message: 'Name cannot contain consecutive spaces'
    }
  }

  // Check for names that start or end with spaces, hyphens, or apostrophes
  if (/^[\s\-']|[\s\-']$/.test(trimmedName)) {
    return {
      isValid: false,
      message: 'Name cannot start or end with spaces, hyphens, or apostrophes'
    }
  }

  // Check for valid name format (at least one letter)
  if (!/[a-zA-ZÀ-ÿ]/.test(trimmedName)) {
    return {
      isValid: false,
      message: 'Name must contain at least one letter'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

/**
 * Get password strength indicator
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (!password) return 'weak'

  const validation = validatePassword(password)
  const validCriteria = [
    validation.hasMinLength,
    validation.hasUppercase,
    validation.hasLowercase,
    validation.hasNumber,
    validation.hasSpecialChar
  ].filter(Boolean).length

  if (validCriteria <= 2) return 'weak'
  if (validCriteria <= 4) return 'medium'
  return 'strong'
}

/**
 * Get password strength color
 */
export function getPasswordStrengthColor(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'weak':
      return 'text-red-500'
    case 'medium':
      return 'text-yellow-500'
    case 'strong':
      return 'text-green-500'
    default:
      return 'text-gray-500'
  }
}

/**
 * Get password strength text
 */
export function getPasswordStrengthText(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'weak':
      return 'Weak'
    case 'medium':
      return 'Medium'
    case 'strong':
      return 'Strong'
    default:
      return ''
  }
} 