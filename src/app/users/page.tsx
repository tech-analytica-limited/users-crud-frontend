
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Mail, Phone, Plus, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { get } from "@/lib/api/handlers"
import { User } from "@/schemas/user"
import { useQuery } from "@tanstack/react-query"
// import { Response, UsersApiResponse } from "../../../types/Response"


interface Users {
  id:string,
 name:string,
 ext:number,
 phone:number,
 email:string,
 dateOfBirth:string,
 password:string,
}
interface UsersApiResponse  {
  success:boolean,
message:string,
  data: Users[];
  currentPage: number;
  limit: number;
  totalAds: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export default function Page() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 6

  const getCarouselData = async (page: number) => {
    const response = await get<UsersApiResponse>(`/users?page=${page}&limit=${rowsPerPage}`)
    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch users")
    }
    return response
  }

  const { 
    data, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ["users", currentPage, rowsPerPage],
    queryFn: () => getCarouselData(currentPage),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  })

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, data?.totalPages || 1))
  const handleAddUser = () => router.push("/users/create")

  const getDoBColor = () => "bg-gray-100 text-gray-800 hover:bg-gray-100"
  const getSkillColor = () => "bg-green-100 text-green-800 hover:bg-green-100"

  const handleDelete = (id: string) => {
    console.log('Delete user with id:', id)
    // Implement actual delete logic here
    refetch()
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading users</div>

console.log(data?.data, data)


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
        { data?.data.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center space-x-3">
                
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Link href={`/users/${user.id}`}>Edit</Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">Name: {user.name}</h3>
                  <div className="flex gap-1 mt-1">
                    Date of birth:
                    <Badge variant="secondary" className={getDoBColor()}>
                      {user.dateOfBirth}
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
                  <MapPin className="h-3 w-3 mr-2" /> {user.dateOfBirth}
                </div>
                {/* <div className="flex flex-wrap items-center gap-1 text-sm">
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
                </div> */}
              </CardContent>
            </Card>
          ))
        }
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center space-x-1">
            {data?.totalPages && Array.from({ length: data?.totalPages }, (_, i) => i + 1).map((page) => (
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage} 
            disabled={currentPage === data?.totalPages}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
