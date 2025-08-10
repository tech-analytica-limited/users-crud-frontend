"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, patch } from "@/lib/api/handlers";
import { UserSchema, User } from "@/schemas/user";
import { PhoneInput } from "@/components/phone-input";

type UpdateUser = Omit<User, "id">;

interface UserResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    ext: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    password: string;
    skills: Array<{
      field: string;
      tags: string[];
    }>;
  };
}

interface UpdateResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    ext: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    password: string;
    skills: Array<{
      field: string;
      tags: string[];
    }>;
    createdAt: string;
    updatedAt: string;
  };
}

export default function UpdateUserPage() {
  const params = useParams();
  const userId = params["update-user"] as string;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  // Fetch user data
  const {
    data: userData,
    isLoading: isLoadingUser,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await get<UserResponse>(`/users/${userId}`);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch user");
      }
      return response;
    },
    enabled: !!userId,
  });

  const form = useForm<UpdateUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      ext: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      password: "",
      skills: [{ field: "", tags: [""] }],
    },
  });

  // Update form when data is loaded
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      const phoneNumber = `${user.ext}${user.phone}`;
      setPhoneValue(phoneNumber);
      setOriginalPassword(user.password);

      form.reset({
        name: user.name,
        ext: user.ext,
        phone: user.phone,
        email: user.email,
        dateOfBirth: user.dateOfBirth.split("T")[0], // Format date for input
        password: user.password, // Populate password field
        skills:
          user.skills.length > 0 ? user.skills : [{ field: "", tags: [""] }],
      });
    }
  }, [userData, form]);

  // Update mutation
  const updateMutation = useMutation<UpdateResponse, Error, UpdateUser>({
    mutationFn: async (data) => {
      const response = await patch<UpdateResponse>(`/users/${userId}`, data);
      if (!response.success) {
        throw new Error(response.message || "Failed to update user");
      }
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success(data.message || "User updated successfully!");
      router.push("/users");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user");
    },
  });

  const skills = form.watch("skills");

  const onSubmit = (data: UpdateUser) => {
    // Filter out empty skills and tags
    const cleanedSkills = data.skills
      .filter((skill) => skill.field.trim() !== "")
      .map((skill) => ({
        ...skill,
        tags: skill.tags.filter((tag) => tag.trim() !== ""),
      }))
      .filter((skill) => skill.tags.length > 0);

    const submitData: Partial<UpdateUser> = {
      ...data,
      skills: cleanedSkills,
    };

    // Only include password if it's different from the original
    if (data.password === originalPassword) {
      const { password, ...dataWithoutPassword } = submitData;
      updateMutation.mutate(dataWithoutPassword as UpdateUser);
    } else {
      updateMutation.mutate(submitData as UpdateUser);
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (value) {
      setPhoneValue(value);
      const match = value.match(/^\+(\d{1,4})/);
      if (match) {
        const countryCode = `+${match[1]}`;
        const phoneNumber = value.replace(countryCode, "");
        form.setValue("ext", countryCode);
        form.setValue("phone", phoneNumber);
        form.clearErrors(["ext", "phone"]);
      }
    } else {
      setPhoneValue("");
      form.setValue("ext", "");
      form.setValue("phone", "");
      form.clearErrors(["ext", "phone"]);
    }
  };

  const addSkill = () => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", [...currentSkills, { field: "", tags: [""] }]);
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills");
    if (currentSkills.length > 1) {
      form.setValue(
        "skills",
        currentSkills.filter((_, i) => i !== index),
      );
    }
  };

  const addTag = (skillIndex: number) => {
    const currentSkills = form.getValues("skills");
    const updatedSkills = [...currentSkills];
    updatedSkills[skillIndex].tags.push("");
    form.setValue("skills", updatedSkills);
  };

  const removeTag = (skillIndex: number, tagIndex: number) => {
    const currentSkills = form.getValues("skills");
    const updatedSkills = [...currentSkills];
    if (updatedSkills[skillIndex].tags.length > 1) {
      updatedSkills[skillIndex].tags = updatedSkills[skillIndex].tags.filter(
        (_, i) => i !== tagIndex,
      );
      form.setValue("skills", updatedSkills);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <p className="text-muted-foreground mt-2">Fetching user data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">User not found</h1>
          <p className="text-muted-foreground mt-2">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="mt-4">
            <Link href="/users">Back to Users</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/users" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Update User</h1>
          <p className="text-muted-foreground">
            Update user information and settings
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel>Phone Number*</FormLabel>
                  <PhoneInput
                    international
                    defaultCountry="BD"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    placeholder="Enter phone number"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-destructive text-sm font-medium">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                  {!form.formState.errors.phone &&
                    form.formState.errors.ext && (
                      <p className="text-destructive text-sm font-medium">
                        {form.formState.errors.ext.message}
                      </p>
                    )}
                </div>

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            {...field}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hidden fields for form validation */}
              <input type="hidden" {...form.register("ext")} />
              <input type="hidden" {...form.register("phone")} />
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skills</CardTitle>
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="space-y-4 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Skill {skillIndex + 1}</h4>
                    {skills.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSkill(skillIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`skills.${skillIndex}.field`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Field*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Programming, Design, Marketing"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Tags*</FormLabel>
                      <Button
                        type="button"
                        onClick={() => addTag(skillIndex)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Tag
                      </Button>
                    </div>

                    {skill.tags.map((tag, tagIndex) => (
                      <div key={tagIndex} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`skills.${skillIndex}.tags.${tagIndex}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="e.g., JavaScript, React, Node.js"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTag(skillIndex, tagIndex)}
                          disabled={skill.tags.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/users")}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {updateMutation.isPending ? "Updating..." : "Update User"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
