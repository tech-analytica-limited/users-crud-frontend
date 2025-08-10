'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUserFormStore } from '@/store/userFormStore';
import { Stepper } from '@/components/forms/Stepper';
import { Step1 } from '@/components/forms/Step1';
import { Step2 } from '@/components/forms/Step2';
import { Step3 } from '@/components/forms/Step3';
import { Step4 } from '@/components/forms/Step4';

const steps = ['Basic Info', 'Personal Info', 'Skills', 'Review'];

const CreateUserPage = () => {
  const router = useRouter();
  const { currentStep, nextStep, prevStep, setCurrentStep, resetForm } = useUserFormStore();

  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleBack = () => {
    resetForm();
    router.back();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <Step3 onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <Step4 onPrev={handlePrev} />;
      default:
        return <Step1 onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold">Create New User</h1>
            <div className="w-20"></div>
          </div>

          {/* Stepper */}
          <Stepper 
            currentStep={currentStep} 
            totalSteps={steps.length} 
            steps={steps} 
          />

          {/* Step Contents */}
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;