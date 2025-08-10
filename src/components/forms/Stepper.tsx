"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const Stepper = ({ currentStep, totalSteps, steps }: StepperProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                    {
                      "bg-primary border-primary text-white": isCompleted,
                      "border-primary text-primary bg-white": isCurrent,
                      "border-gray-300 bg-white text-gray-500":
                        !isCompleted && !isCurrent,
                    },
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "mt-2 max-w-20 text-center text-xs font-medium",
                    {
                      "text-primary": isCompleted || isCurrent,
                      "text-gray-500": !isCompleted && !isCurrent,
                    },
                  )}
                >
                  {step}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn("mx-4 h-0.5 flex-1 transition-colors", {
                    "bg-primary": isCompleted,
                    "bg-gray-300": !isCompleted,
                  })}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
