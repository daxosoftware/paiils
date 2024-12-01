export interface LanguageProficiency {
  language: string;
  level: 'native' | 'fluent' | 'professional' | 'intermediate';
  hasVerification: boolean;
  verificationDocument?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dateObtained: string;
  expiryDate?: string;
  documentUrl: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface Specialization {
  category: string;
  subcategories: string[];
  yearsOfExperience: number;
}

export interface BackgroundCheck {
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  submissionDate: string;
  completionDate?: string;
  provider: string;
  referenceNumber?: string;
}

export interface InterpreterProfile {
  userId: string;
  languages: LanguageProficiency[];
  certifications: Certification[];
  specializations: Specialization[];
  backgroundCheck: BackgroundCheck;
  availability: {
    timeZone: string;
    weeklySchedule: Array<{
      day: string;
      slots: Array<{ start: string; end: string }>;
    }>;
  };
  equipmentCheck: {
    hasStableInternet: boolean;
    hasWebcam: boolean;
    hasHeadset: boolean;
    internetSpeed?: number;
  };
}