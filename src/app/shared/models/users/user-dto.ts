import { UserRole } from '@enums/user-role';

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
