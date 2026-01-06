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

// DEMO MODE: Authentication bypassed for testing
const DEMO_USER = {
  id: 'demo-user-123',
  username: 'DemoTrader',
  ageBand: 'TEEN' as const,
  createdAt: new Date().toISOString(),
  learningLevel: 1,
  totalPoints: 0,
};

export const useAuth = create<AuthState>((set) => ({
  // DEMO MODE: Pre-authenticated for testing
  user: DEMO_USER,
  isAuthenticated: true,
  isLoading: false,
  error: null,

  register: async (username, password, ageBand) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.register(username, password, ageBand);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Registration failed',
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
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Login failed',
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
    // DEMO MODE: Skip API check, always authenticated
    set({ user: DEMO_USER, isAuthenticated: true, isLoading: false });
  },

  clearError: () => set({ error: null }),
}));
