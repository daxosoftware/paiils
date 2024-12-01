import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { LanguageProficiency } from '../../types/onboarding';

interface LanguageVerificationFormProps {
  onSubmit: (languages: LanguageProficiency[]) => void;
  initialLanguages?: LanguageProficiency[];
}

export function LanguageVerificationForm({ onSubmit, initialLanguages = [] }: LanguageVerificationFormProps) {
  const [languages, setLanguages] = useState<LanguageProficiency[]>(initialLanguages);

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: '',
        level: 'professional',
        hasVerification: false,
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, updates: Partial<LanguageProficiency>) => {
    setLanguages(
      languages.map((lang, i) => (i === index ? { ...lang, ...updates } : lang))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(languages);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Language Proficiency</h3>
        
        {languages.map((lang, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg relative">
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) =>
                      updateLanguage(index, { language: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Proficiency Level
                  <select
                    value={lang.level}
                    onChange={(e) =>
                      updateLanguage(index, {
                        level: e.target.value as LanguageProficiency['level'],
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="native">Native</option>
                    <option value="fluent">Fluent</option>
                    <option value="professional">Professional</option>
                    <option value="intermediate">Intermediate</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={lang.hasVerification}
                  onChange={(e) =>
                    updateLanguage(index, { hasVerification: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I have verification documents for this language
                </span>
              </label>
            </div>

            {lang.hasVerification && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Verification Document
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateLanguage(index, {
                        verificationDocument: e.target.files?.[0]?.name,
                      })
                    }
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </label>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addLanguage}
          className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Another Language
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