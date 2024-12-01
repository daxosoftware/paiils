import React, { useState } from 'react';
import { OnboardingProgress } from '../components/onboarding/OnboardingProgress';
import { LanguageVerificationForm } from '../components/onboarding/LanguageVerificationForm';
import { CertificationUploadForm } from '../components/onboarding/CertificationUploadForm';
import { BackgroundCheckForm } from '../components/onboarding/BackgroundCheckForm';
import type { InterpreterProfile } from '../types/onboarding';

const steps = [
  {
    id: 'languages',
    name: 'Language Verification',
    description: 'Add your working languages',
    status: 'current',
  },
  {
    id: 'certifications',
    name: 'Certifications',
    description: 'Upload your credentials',
    status: 'upcoming',
  },
  {
    id: 'background',
    name: 'Background Check',
    description: 'Verify your identity',
    status: 'upcoming',
  },
];

export function InterpreterOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<InterpreterProfile>>({});

  const updateProfile = (updates: Partial<InterpreterProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    setCurrentStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LanguageVerificationForm
            onSubmit={(languages) => updateProfile({ languages })}
            initialLanguages={profile.languages}
          />
        );
      case 1:
        return (
          <CertificationUploadForm
            onSubmit={(certifications) => updateProfile({ certifications })}
            initialCertifications={profile.certifications}
          />
        );
      case 2:
        return (
          <BackgroundCheckForm
            onSubmit={(backgroundCheck) => updateProfile({ backgroundCheck })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Interpreter Onboarding
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your profile to start accepting interpretation assignments
          </p>
        </div>

        <OnboardingProgress
          steps={steps.map((step, index) => ({
            ...step,
            status:
              index < currentStep
                ? 'complete'
                : index === currentStep
                ? 'current'
                : 'upcoming',
          }))}
          currentStep={currentStep}
        />

        {renderStep()}
      </div>
    </div>
  );
}