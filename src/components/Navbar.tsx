"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Settings, LogOut, ChevronRight } from "lucide-react"
import UserAvatar from "@/components/UserAvatar"


export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  


  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              FinanceApp
            </Link>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
                             <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <UserAvatar user={user} size="md" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white shadow-xl border border-gray-200 rounded-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" align="end">
                  <DropdownMenuLabel className="font-normal p-6">
                    <div className="flex flex-col items-center space-y-4">
                      <UserAvatar user={user} size="lg" />
                       <div className="text-center">
                         <p className="text-base font-semibold leading-none text-gray-900">{user.name || 'User'}</p>
                         <p className="text-sm leading-none text-gray-500 mt-1">{user.email || 'No email'}</p>
                       </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center">
                      <Settings className="mr-3 h-4 w-4 text-gray-600" />
                      <span className="text-gray-700 font-medium">Account Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors">
                    <LogOut className="mr-3 h-4 w-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="hover:bg-gray-100 transition-colors">Đăng nhập</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
