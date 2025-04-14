export interface User {
    id: string;
    username: string;
    email: string;
    role: string; 
  }

export interface AuthState {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  }