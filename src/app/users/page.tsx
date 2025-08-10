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
  "id": 1,
  "name": "md hasan ",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 2,
  "name": "md orasur rahman",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 3,
  "name": "orasur rahman",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 4,
  "name": "hasan",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 5,
  "name": "Liam Garcia",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 6,
  "name": "Liam Garcia",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 7,
  "name": "ashraf",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 8,
  "name": "md orasur",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 9,
  "name": "orasur",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 10,
  "name": "hasan ali",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 11,
  "name": "ar rahman",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
},
{
  "id": 12,
  "name": "hasan",
  "email": "liam.garcia@example.com",
  "phone": "+1 (555) 234-5678",
  "DoB": "1997-10-07",
  "skills": [
    { "fields": ["React.js", "Next.js"] },
    { "tags": ["Front-End", "Full Stack"] }
  ],
  "location": "Jacksonville, FL",
  "avatar": "/placeholder.svg?height=40&width=40"
}
]

export default function Page() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  const totalPages = Math.ceil(mockUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = mockUsers.slice(startIndex, endIndex)

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handleAddUser = () => router.push("/user/create")

  const getDoBColor = () => "bg-gray-100 text-gray-800 hover:bg-gray-100"

  const getSkillColor = () => "bg-green-100 text-green-800 hover:bg-green-100"

  const handleEdite=()=>{
    console.log('handle edite button')
  }


  const handleDelete=()=>{
        console.log('handle delete button')

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
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={()=>handleEdite()}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={()=>handleDelete()}>Delete</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">Name: {user.name}</h3>
                <div className="flex gap-1 mt-1">
                  Date of birth:
                  <Badge variant="secondary" className={getDoBColor()}>
                    {user.DoB}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-3 w-3 mr-2" /> {user.email}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-3 w-3 mr-2" /> {user.phone}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-2" /> {user.location}
              </div>

              <div className="flex flex-wrap items-center gap-1 text-sm">
                Skills:
                {user.skills.flatMap((obj) =>
                  Object.values(obj).flat().map((skill, i) => (
                    <Badge
                      key={`${user.id}-${skill}-${i}`}
                      variant="secondary"
                      className={getSkillColor()}
                    >
                      {skill}
                    </Badge>
                  ))
                )}
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
            <ChevronLeft className="h-4 w-4" /> Previous
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
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
