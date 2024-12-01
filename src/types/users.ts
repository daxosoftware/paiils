export type UserRole = 'admin' | 'interpreter' | 'client' | 'support';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

export interface InterpreterUser extends User {
  role: 'interpreter';
  languages: string[];
  certifications: string[];
  availability: AvailabilitySlot[];
  rating: number;
  completedSessions: number;
}

export interface ClientUser extends User {
  role: 'client';
  organization?: string;
  preferredLanguages: string[];
  bookingHistory: string[];
}

export interface SupportUser extends User {
  role: 'support';
  department: 'finance' | 'customer_service' | 'quality_assurance';
  assignedTickets: string[];
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}