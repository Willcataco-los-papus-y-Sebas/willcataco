import { UserRole } from '@enums/user-role';
import { UserScope } from '@models/auth';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  scope: UserScope;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
