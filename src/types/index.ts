export interface Interpreter {
  id: string;
  name: string;
  languages: string[];
  certifications: string[];
  availability: AvailabilitySlot[];
  rating: number;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Booking {
  id: string;
  interpreterId: string;
  clientId: string;
  dateTime: string;
  duration: number;
  sourceLanguage: string;
  targetLanguage: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}