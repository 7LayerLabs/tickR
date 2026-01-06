import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AgeBand } from '@/types';

// =====================================================
//   DEMO MODE AUTH
//   Uses localStorage for persistence - no backend required
// =====================================================

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

// Simple hash for demo passwords (NOT secure - demo only)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// Get stored users from localStorage
const getStoredUsers = (): Record<string, { passwordHash: string; ageBand: AgeBand; createdAt: string }> => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('tickr-demo-users');
  return stored ? JSON.parse(stored) : {};
};

// Save users to localStorage
const saveStoredUsers = (users: Record<string, { passwordHash: string; ageBand: AgeBand; createdAt: string }>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tickr-demo-users', JSON.stringify(users));
  }
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (username, password, ageBand) => {
        set({ isLoading: true, error: null });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getStoredUsers();

        // Check if username already exists
        if (users[username.toLowerCase()]) {
          set({ error: 'Username already taken', isLoading: false });
          throw new Error('Username already taken');
        }

        // Create new user
        const newUser: User = {
          id: `user_${Date.now()}`,
          username,
          ageBand,
          learningLevel: 1,
          points: 0,
          createdAt: new Date().toISOString(),
        };

        // Store user credentials
        users[username.toLowerCase()] = {
          passwordHash: simpleHash(password),
          ageBand,
          createdAt: newUser.createdAt,
        };
        saveStoredUsers(users);

        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      login: async (username, password) => {
        set({ isLoading: true, error: null });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getStoredUsers();
        const storedUser = users[username.toLowerCase()];

        // Check credentials
        if (!storedUser || storedUser.passwordHash !== simpleHash(password)) {
          set({ error: 'Invalid username or password', isLoading: false });
          throw new Error('Invalid username or password');
        }

        // Restore user
        const user: User = {
          id: `user_${username.toLowerCase()}`,
          username,
          ageBand: storedUser.ageBand,
          learningLevel: 1,
          points: 0,
          createdAt: storedUser.createdAt,
        };

        set({ user, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      checkAuth: async () => {
        // In demo mode, auth state is persisted via zustand persist
        // Just mark as not loading
        const state = get();
        if (state.user) {
          set({ isAuthenticated: true, isLoading: false });
        } else {
          set({ isAuthenticated: false, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'tickr-auth',
      version: 1,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
