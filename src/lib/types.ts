export interface User {
  _id: string
  email: string
  name: string
  avatar: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Transaction {
  id: string
  userId: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface Account {
  id: string
  userId: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface Budget {
  id: string
  userId: string
  name: string
  amount: number
  spent: number
  period: 'monthly' | 'yearly'
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface Investment {
  id: string
  userId: string
  symbol: string
  name: string
  shares: number
  averagePrice: number
  currentPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data?: T
  error?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token?: string
}

export interface RegisterResponse {
  _id: string
  createAt: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<void>
  googleLogin: (code: string) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  loading: boolean
  setUserDirectly: (user: User) => void
}
