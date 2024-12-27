import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState } from '@/types/user';
import { jwtDecode } from 'jwt-decode';

interface AuthStore extends AuthState {
  setAuth: (token: string, user: AuthState['user']) => void;
  clearAuth: () => void;
  refreshToken: () => Promise<void>;
  isTokenExpired: () => boolean;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },
      clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
      refreshToken: async () => {
        const currentToken = get().token;
        if (!currentToken) throw new Error('No token available');
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          });
          if (!response.ok) {
            get().clearAuth();
            throw new Error('Failed to refresh token, logging out');
          }
          const data = await response.json();
          set({ token: data.accessToken });
        } catch (error) {
          console.error('Error refreshing token:', error);
          get().clearAuth();
          throw error;
        }
      },
      isTokenExpired: () => {
        const token = get().token;
        if (!token) return true;
        try {
          const decoded: { exp: number } = jwtDecode(token);
          return decoded.exp * 1000 < Date.now();
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useAuth = () => {
  const store = useAuthStore();
  return {
    ...store,
    login: store.setAuth,
    logout: store.clearAuth,
  };
};

export const useAuthToken = () => useAuthStore((state) => state.token);