"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserFormStore } from "@/store/userFormStore";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/api/handlers";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/schemas/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Upload } from "lucide-react";

interface Step4Props {
  onPrev: () => void;
}

export const Step4 = ({ onPrev }: Step4Props) => {
  const { formData, resetForm } = useUserFormStore();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const userMutation = useMutation({
    mutationFn: async (data: User) => {
      const payload = {
        ...data,
        // Converted dateOfBirth to ISO string format
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      };

      return await post("/user", payload);
    },
    onSuccess: () => {
      toast.success("User created successfully!");
      resetForm();
      router.push("/users"); // Adjust the route as needed
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data) {
        toast.error(
          `Error: ${error.response?.data.message || "Failed to create user"}`,
        );
      } else {
        toast.error("An unexpected error occurred!");
      }
    },
  });

  const handleSubmit = () => {
    if (formData as User) {
      userMutation.mutate(formData as User);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should not exceed 2MB");
        event.target.value = "";
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Step 4: Review & Submit</h2>
        <p className="text-gray-600">
          Please review your information
        </p>
      </div>

      <div className="space-y-4">
        {/* Profile Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
              <div className="relative flex flex-col items-center">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile Preview"
                    width={120}
                    height={118}
                    className="h-[118px] w-[120px] rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex h-[118px] w-[120px] items-center justify-center rounded-lg border bg-gray-200">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2 md:items-start">
                <Label htmlFor="profile-image" className="text-lg font-medium">
                  Profile Photo
                </Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full max-w-xs"
                />
                <p className="text-sm text-gray-500">
                  Image should be below 2MB. Accepted formats: JPG, PNG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">User ID:</span>
                <p>{formData.id || "Not provided"}</p>
              </div>
              <div>
                <span className="font-medium">Phone Number:</span>
                <p>
                  {formData.ext}
                  {formData.phoneNumber || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Full Name:</span>
                <p>{formData.name || "Not provided"}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p>{formData.email || "Not provided"}</p>
              </div>
              <div>
                <span className="font-medium">Date of Birth:</span>
                <p>{formatDate(formData.dateOfBirth || "")}</p>
              </div>
              <div>
                <span className="font-medium">Password:</span>
                <p>{"*".repeat(formData.password?.length || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {!formData.skills || formData.skills.length === 0 ? (
              <p className="text-gray-500">No skills added</p>
            ) : (
              <div className="space-y-4">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="border-primary border-l-4 pl-4">
                    <h4 className="font-medium">{skill.field}</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skill.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous Step
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={userMutation.isPending}
          className="bg-primary text-white"
        >
          {userMutation.isPending ? "Creating User..." : "Create User"}
        </Button>
      </div>
    </div>
  );
};
