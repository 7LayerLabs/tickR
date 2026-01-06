import { create } from 'zustand';
import { User, AgeBand } from '@/types';
import { apiClient } from './api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (username: string, password: string, ageBand: AgeBand) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  // Real auth - start unauthenticated
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start loading to check for existing token
  error: null,

  register: async (username, password, ageBand) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.register(username, password, ageBand);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      set({
        error: axiosError.response?.data?.error || 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.login(username, password);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      set({
        error: axiosError.response?.data?.error || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    apiClient.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    // Check for existing token and validate with API
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const response = await apiClient.getMe();
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch {
      // Token invalid or expired - clear it
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
