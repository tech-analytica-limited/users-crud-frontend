'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
const router=useRouter()


const handleBack=()=>{
router.back()
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="h-24 w-24 text-gray-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button onClick={()=>handleBack()} variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Go Back
            </Button>
          </div>

        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Error Code: 404 - Page Not Found</p>
          <p>If this problem persists, please report it to our technical team.</p>
        </div>
      </div>
    </div>
  )
}
