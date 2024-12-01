import { useState, useEffect } from 'react';
import type { User } from '../types/users';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      // TODO: Implement actual login logic
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setAuthState({ user: mockUser, isLoading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to login',
        isLoading: false,
      }));
    }
  };

  const logout = () => {
    setAuthState({ user: null, isLoading: false, error: null });
  };

  return {
    ...authState,
    login,
    logout,
  };
}