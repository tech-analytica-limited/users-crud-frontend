"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Plus,
  MapPin,
  User,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { get } from "@/lib/api/handlers";
import { useQuery } from "@tanstack/react-query";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

interface Users {
  id: string;
  name: string;
  ext: number;
  phone: number;
  email: string;
  dateOfBirth: string;
  password: string;
  skills: Array<{
    field: string;
    tags: string[];
  }>;
}

interface UsersApiResponse {
  success: boolean;
  message: string;
  data: Users[];
  currentPage: number;
  limit: number;
  totalAds: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const getCarouselData = async (page: number) => {
    const response = await get<UsersApiResponse>(
      `/users?page=${page}&limit=${rowsPerPage}`,
    );
    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch users");
    }
    return response;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users", currentPage, rowsPerPage],
    queryFn: () => getCarouselData(currentPage),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, data?.totalPages || 1));
  const handleAddUser = () => router.push("/users/create");

  const getDoBColor = () => "bg-blue-100 text-blue-800 hover:bg-blue-100";
  const getSkillColor = () => "bg-green-100 text-green-800 hover:bg-green-100";

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  console.log(data?.data, data);

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and view all users in your system
          </p>
        </div>
        <Button onClick={handleAddUser} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((user) => (
          <Card
            key={user.id}
            className="h-fit transition-shadow hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-end space-x-2">
                <Button size="sm" variant="ghost">
                  <Link href={`/users/${user.id}`}>Edit</Link>
                </Button>
                <DeleteConfirmationDialog
                  id={user.id}
                  trigger={
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <h3 className="truncate text-base font-semibold">
                    {user.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">DOB:</span>
                  <Badge variant="secondary" className={getDoBColor()}>
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center text-sm">
                  <Mail className="mr-2 h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <Phone className="mr-2 h-3 w-3 flex-shrink-0" />
                  <span>
                    {user.ext}
                    {user.phone}
                  </span>
                </div>
              </div>

              {/* Skills Section */}
              {user.skills && user.skills.length > 0 && (
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                    <Briefcase className="h-3 w-3" />
                    <span>Skills</span>
                  </div>
                  <div className="space-y-2">
                    {user.skills.map((skillGroup, groupIndex) => (
                      <div
                        key={`${user.id}-skill-group-${groupIndex}`}
                        className="space-y-1"
                      >
                        <div className="text-muted-foreground text-xs font-medium capitalize">
                          {skillGroup.field}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {skillGroup.tags.map((tag, tagIndex) => (
                            <Badge
                              key={`${user.id}-${skillGroup.field}-${tag}-${tagIndex}`}
                              variant="secondary"
                              className={getSkillColor()}
                              title={`${skillGroup.field}: ${tag}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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
            {data?.totalPages &&
              Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ),
              )}
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
  );
}
