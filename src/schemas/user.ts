import { z } from "zod";

export const UserSchema = z.object({
  id: z
    .string()
    .min(1, "ID is required")
    .max(10, "ID must be less than 10 characters"),
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  ext: z.string().min(1, "Phone country code is required"),
  phoneNumber: z.string().min(5, "Phone number is required"),
  email: z.email("Email is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date of Birth must be selected",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  skills: z.array(
    z.object({
      field: z.string().min(3, "Field is required"),
      tags: z.array(z.string().min(3, "Tag must be at least 3 character")),
    }),
  ),
});

export type User = z.infer<typeof UserSchema>;
