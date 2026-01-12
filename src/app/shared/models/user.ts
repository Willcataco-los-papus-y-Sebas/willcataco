import { UserRole } from '@enums/user-role';
export { UserRole };
export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'bg-primary',
  [UserRole.STAFF]: 'bg-secondary',
  [UserRole.MEMBER]: 'bg-muted', 
};

export const ROLE_OPTIONS = [
  { label: UserRole.ADMIN },
  { label: UserRole.STAFF },
  { label: UserRole.MEMBER },
];