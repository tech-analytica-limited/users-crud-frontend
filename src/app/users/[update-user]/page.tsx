"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, X, Upload, User } from "lucide-react"
import { toast } from "sonner"

// Mock user data (same as users page)
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

interface UserInterface {
  id: number
  name: string
  email: string
  phone: string
  DoB: string
  skillsField: string
  skillsTags: string
  location: string
  avatar: string
}

export default function EditUserPage() {
      const params = useParams();
  const id = params?.updateuser;
  const router = useRouter()
  const [user, setUser] = useState<UserInterface | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    DoB: "",
    skillsField: "",
    skillsTags: "",
    location: "",
    password: "",
  })

console.log("id",params)

  // Load user data
  useEffect(() => {
    const userId = Number.parseInt("1")
    console.log(userId)
    const foundUser = mockUsers.find((u) => u.id === userId)
    if (foundUser) {
      // setUser(foundUser)
    
    }
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

console.log("formData", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
       toast("User updated successfully", {
          description: `${formData.name}'s information has been saved.`,
        })

    setIsLoading(false)
    router.push("/users")
  }

  const handleCancel = () => {
    router.push("/users")
  }

//   if (!user) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">User not found</h1>
//           <p className="text-muted-foreground mt-2">The user you're looking for doesn't exist.</p>
//           <Button asChild className="mt-4">
//             <Link href="/users">Back to Users</Link>
//           </Button>
//         </div>
//       </div>
//     )
//   }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/users" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit User</h1>
          <p className="text-muted-foreground">Update user information and settings</p>
        </div>
      </div>

      <div className="">
  

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="DoB">Date of Birth</Label>
                  <Input value={formData.DoB} onChange={(e) => handleInputChange("DoB", e.target.value)} id="DoB" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills Field</Label>
                  <Input
                    id="skillsField"
                    value={formData.skillsField}
                    onChange={(e) => handleInputChange("skillsField", e.target.value)}
                    placeholder="Enter skills Field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills Tags</Label>
                  <Input
                    id="skillsTags"
                    value={formData.skillsTags}
                    onChange={(e) => handleInputChange("skillsTags", e.target.value)}
                    placeholder="Enter skills Tags"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

  
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 text-white bg-red-500">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

