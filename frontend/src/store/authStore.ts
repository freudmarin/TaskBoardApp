import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse } from '../types';
import { websocketService } from '../services/websocket';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      username: null,
      email: null,
      isAuthenticated: false,

      login: (authResponse: AuthResponse) => {
        localStorage.setItem('accessToken', authResponse.accessToken);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
        set({
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          userId: authResponse.userId,
          username: authResponse.username,
          email: authResponse.email,
          isAuthenticated: true,
        });

        // Connect to WebSocket
        websocketService.connect(authResponse.accessToken).catch((error) => {
          console.error('Failed to connect WebSocket:', error);
        });
      },

      logout: () => {
        // Disconnect WebSocket
        websocketService.disconnect();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          username: null,
          email: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

