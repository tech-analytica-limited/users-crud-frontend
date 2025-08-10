import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/schemas/user';

interface UserFormState {
  currentStep: number;
  formData: Partial<User>;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<User>) => void;
  resetForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialFormData: Partial<User> = {
  name: '',
  ext: '',
  phone: '',
  email: '',
  dateOfBirth: '',
  password: '',
  skills: [{ field: '', tags: [''] }],
};

export const useUserFormStore = create<UserFormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: initialFormData,
      setCurrentStep: (step: number) => set({ currentStep: step }),
      updateFormData: (data: Partial<User>) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
        }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 4),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),
    }),
    {
      name: 'user-form-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: state.formData,
      }),
    }
  )
);
