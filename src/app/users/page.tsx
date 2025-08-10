
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Mail, Phone, Plus, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    DoB: "1998-10-07",
    skills: "Active",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    DoB: "1997-10-07",
    skills: "Active",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 345-6789",
    DoB: "1997-10-25",
    skills: "Inactive",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 456-7890",
    DoB: "1997-10-07",
    skills: "Active",
    location: "Houston, TX",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva.brown@example.com",
    phone: "+1 (555) 567-8901",
    DoB: "1998-10-07",
    skills: "Active",
    location: "Phoenix, AZ",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    phone: "+1 (555) 678-9012",
    DoB: "1997-10-07",
    skills: "Inactive",
    location: "Philadelphia, PA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@example.com",
    phone: "+1 (555) 789-0123",
    DoB: "1997-10-25",
    skills: "Active",
    location: "San Antonio, TX",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Henry Taylor",
    email: "henry.taylor@example.com",
    phone: "+1 (555) 890-1234",
    DoB: "1997-10-07",
    skills: "Active",
    location: "San Diego, CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    name: "Ivy Chen",
    email: "ivy.chen@example.com",
    phone: "+1 (555) 901-2345",
    DoB: "1998-10-07",
    skills: "Active",
    location: "Dallas, TX",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    name: "Jack Anderson",
    email: "jack.anderson@example.com",
    phone: "+1 (555) 012-3456",
    DoB: "1997-10-07",
    skills: "Inactive",
    location: "San Jose, CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 11,
    name: "Kate Williams",
    email: "kate.williams@example.com",
    phone: "+1 (555) 123-4567",
    DoB: "1997-10-25",
    skills: "Active",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 12,
    name: "Liam Garcia",
    email: "liam.garcia@example.com",
    phone: "+1 (555) 234-5678",
    DoB: "1997-10-07",
    skills: "Active",
    location: "Jacksonville, FL",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Page() {
    const router=useRouter();
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  // Calculate pagination
  const totalPages = Math.ceil(mockUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = mockUsers.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleAddUser = () => {
    // Handle add user functionality
    console.log("Add user clicked")
    router.push('/user/create')
  }

  const getDoBColor = (DoB: string) => {
    switch (DoB) {
      case "Admin":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Moderator":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getskillsColor = (skills: string) => {
    return skills === "Active"
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage and view all users in your system</p>
        </div>
        <Button onClick={handleAddUser} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {currentUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
               <div className="">
                <Button variant={"ghost"}>Edit</Button>
                <Button variant={"destructive"}>Delete</Button>
               </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
                    <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">Name: {user.name}</h3>
                  <div className="flex gap-1 mt-1">
                     Date of birth: <Badge variant="secondary" className={getDoBColor(user.DoB)}>
                     {user.DoB}
                    </Badge>
              
                  </div>
                </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate">{user.location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                Skills:  <Badge variant="secondary" className={getskillsColor(user.skills)}>
                      {user.skills}
                    </Badge>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, mockUsers.length)} of {mockUsers.length} users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
