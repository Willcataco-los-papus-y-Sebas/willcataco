export type UserScope = 'member' | 'internal' | null;

export interface AuthResponse {
  data: {
    id: number;
    username: string;
    email: string;
    role: string;
    scope: UserScope;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  scope: UserScope;
}

export interface InternalLoginRequest {
  username: string;
}

export interface ResetPasswordRequest {
  first: string;
  second: string;
}

export interface ForgotPasswordRequest {
  email: string;
  url: string;
}
