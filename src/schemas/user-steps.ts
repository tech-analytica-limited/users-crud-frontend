import { z } from 'zod';

// Step 1: Phone Number only
export const Step1Schema = z.object({
  ext: z.string().min(1, "Please select a country code"),
  phone: z.string().min(5, "Please enter a valid phone number"),
});

// Step 2: Personal Information
export const Step2Schema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.email("Email is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date of Birth must be selected",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Step 3: Skills
export const Step3Schema = z.object({
  skills: z.array(
    z.object({
      field: z.string().min(3, "Field is required"),
      tags: z.array(z.string().min(3, "Tag must be at least 3 character")),
    }),
  ),
});

export type Step1Data = z.infer<typeof Step1Schema>;
export type Step2Data = z.infer<typeof Step2Schema>;
export type Step3Data = z.infer<typeof Step3Schema>;
