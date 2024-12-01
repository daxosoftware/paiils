import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  id: string;
  name: string;
  description: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface OnboardingProgressProps {
  steps: Step[];
  currentStep: number;
}

export function OnboardingProgress({ steps, currentStep }: OnboardingProgressProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <div className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
              <span className="text-sm font-medium text-blue-600">
                Step {index + 1}
              </span>
              <span className="text-sm font-medium">
                {step.name}
              </span>
              <span className="text-sm text-gray-500">
                {step.description}
              </span>
              <span className="mt-2">
                {step.status === 'complete' ? (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}