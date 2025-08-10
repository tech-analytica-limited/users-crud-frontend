'use client';

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
import { Step1Schema, Step1Data } from '@/schemas/user-steps';
import { useUserFormStore } from '@/store/userFormStore';
import { PhoneInput } from '@/components/phone-input';
import { formatPhoneNumber, getCountryCallingCode } from 'react-phone-number-input';
import { useState } from 'react';

interface Step1Props {
  onNext: () => void;
}

export const Step1 = ({ onNext }: Step1Props) => {
  const { formData, updateFormData } = useUserFormStore();
  const [phoneValue, setPhoneValue] = useState(
    formData.ext && formData.phoneNumber 
      ? `${formData.ext}${formData.phoneNumber}` 
      : ''
  );

  const form = useForm<Step1Data>({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      ext: formData.ext || '',
      phoneNumber: formData.phoneNumber || '',
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    onNext();
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (value) {
      setPhoneValue(value);
      // Extract country code and phone number
      const formatted = formatPhoneNumber(value);
      if (formatted) {
        // Get the country from the phone number
        const match = value.match(/^\+(\d{1,4})/);
        if (match) {
          const countryCode = `+${match[1]}`;
          const phoneNumber = value.replace(countryCode, '');
          form.setValue('ext', countryCode);
          form.setValue('phoneNumber', phoneNumber);
          // Clear any previous errors
          form.clearErrors(['ext', 'phoneNumber']);
        }
      }
    } else {
      setPhoneValue('');
      form.setValue('ext', '');
      form.setValue('phoneNumber', '');
      // Clear errors when input is cleared
      form.clearErrors(['ext', 'phoneNumber']);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Step 1: Phone Number</h2>
        <p className="text-gray-600">Please provide your phone number</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Phone Number with Country Code */}
          <div className="space-y-2">
            <FormLabel>Phone Number*</FormLabel>
            <PhoneInput
              international
              defaultCountry="BD"
              value={phoneValue}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.phoneNumber.message}
              </p>
            )}
            {!form.formState.errors.phoneNumber && form.formState.errors.ext && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.ext.message}
              </p>
            )}
          </div>

          {/* Hidden fields for form validation */}
          <input type="hidden" {...form.register('ext')} />
          <input type="hidden" {...form.register('phoneNumber')} />

          <div className="flex justify-end">
            <Button type="submit" className="bg-primary text-white">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
