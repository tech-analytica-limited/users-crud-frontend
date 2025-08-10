'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Step2Schema, Step2Data } from '@/schemas/user-steps';
import { useUserFormStore } from '@/store/userFormStore';
import { Eye, EyeOff } from 'lucide-react';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step2 = ({ onNext, onPrev }: Step2Props) => {
  const { formData, updateFormData } = useUserFormStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<Step2Data>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      name: formData.name || '',
      email: formData.email || '',
      dateOfBirth: formData.dateOfBirth || '',
      password: formData.password || '',
    },
  });

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Step 2: Personal Information</h2>
        <p className="text-gray-600">Please provide your personal details</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
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

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
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

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
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
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous Step
            </Button>
            <Button type="submit" className="bg-primary text-white">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
