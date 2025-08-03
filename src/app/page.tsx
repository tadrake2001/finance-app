"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Shield, Smartphone, BarChart3 } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"


export default function HomePage() {
  const { user } = useAuth()



  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FinanceApp</h2>
            <p className="text-xl text-gray-600">Smart and efficient personal finance management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫45,231,000</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫12,234,000</div>
                <p className="text-xs text-muted-foreground">+4% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫32,997,000</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investments</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫8,500,000</div>
                <p className="text-xs text-muted-foreground">+25% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Income & Expense Chart</CardTitle>
                <CardDescription>Overview of income and expenses over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">January Salary</p>
                      <p className="text-sm text-gray-500">01/01/2024</p>
                    </div>
                    <span className="text-green-600 font-medium">+₫15,000,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Shopping</p>
                      <p className="text-sm text-gray-500">28/12/2023</p>
                    </div>
                    <span className="text-red-600 font-medium">-₫2,500,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Electricity Bill</p>
                      <p className="text-sm text-gray-500">25/12/2023</p>
                    </div>
                    <span className="text-red-600 font-medium">-₫800,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">FinanceApp</h1>
            <p className="text-lg text-gray-600 mb-8">Smart Financial Management</p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-4">
              <Link href="/auth/login">
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Income & Expenses</h3>
              <p className="text-gray-600">Easily manage and track your income and expenses</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">View detailed financial reports and analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">High Security</h3>
              <p className="text-gray-600">Data is secured with modern encryption technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
