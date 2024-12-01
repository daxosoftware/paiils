import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { BackgroundCheck } from '../../types/onboarding';

interface BackgroundCheckFormProps {
  onSubmit: (data: Partial<BackgroundCheck>) => void;
}

export function BackgroundCheckForm({ onSubmit }: BackgroundCheckFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    const backgroundCheck: Partial<BackgroundCheck> = {
      status: 'pending',
      submissionDate: new Date().toISOString(),
      provider: 'VerifyPlus',
    };

    setSubmitted(true);
    onSubmit(backgroundCheck);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Background Check Authorization</h3>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="prose prose-sm text-gray-600">
            <p>To ensure the safety and security of our platform, we require all interpreters to undergo a background check. This process includes:</p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Identity verification</li>
              <li>Criminal record check</li>
              <li>Professional reference verification</li>
              <li>Education verification</li>
            </ul>

            <p className="mt-4">The background check will be conducted by our trusted partner, VerifyPlus. The process typically takes 3-5 business days.</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                I authorize LingualLink to conduct a background check and understand that my onboarding is contingent upon successful completion. I certify that all information provided is accurate and complete.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreed}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Authorize Background Check
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Background Check Initiated</h3>
          <p className="mt-2 text-sm text-gray-600">
            We've received your authorization. You'll receive an email with next steps from VerifyPlus within 24 hours.
          </p>
        </div>
      )}
    </div>
  );
}