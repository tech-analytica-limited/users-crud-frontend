export interface UserResponse {
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