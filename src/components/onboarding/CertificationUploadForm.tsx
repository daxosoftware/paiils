import React, { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import type { Certification } from '../../types/onboarding';

interface CertificationUploadFormProps {
  onSubmit: (certifications: Certification[]) => void;
  initialCertifications?: Certification[];
}

export function CertificationUploadForm({
  onSubmit,
  initialCertifications = [],
}: CertificationUploadFormProps) {
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: '',
        issuer: '',
        dateObtained: '',
        documentUrl: '',
        verificationStatus: 'pending',
      },
    ]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, updates: Partial<Certification>) => {
    setCertifications(
      certifications.map((cert, i) => (i === index ? { ...cert, ...updates } : cert))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(certifications);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Professional Certifications</h3>

        {certifications.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg relative">
            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Certification Name
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(index, { name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issuing Organization
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(index, { issuer: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Obtained
                  <input
                    type="date"
                    value={cert.dateObtained}
                    onChange={(e) =>
                      updateCertification(index, { dateObtained: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date (if applicable)
                  <input
                    type="date"
                    value={cert.expiryDate || ''}
                    onChange={(e) =>
                      updateCertification(index, { expiryDate: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Certificate
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            updateCertification(index, {
                              documentUrl: e.target.files?.[0]?.name || '',
                            })
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCertification}
          className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Another Certification
        </button>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
}