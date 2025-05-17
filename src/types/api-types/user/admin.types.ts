export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: 'admin' | 'user' | 'vendor';
}

export interface CreatedUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  data: CreatedUser;
}

export interface UpdateUserRoleInput {
  id: string;
  data: {
    role: 'user' | 'admin' | 'vendor' | 'super-admin';
  };
}

export interface UpdatedUserRole {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  updatedAt: string;
}

export interface UpdateUserRoleResponse {
  success: boolean;
  message: string;
  data: UpdatedUserRole;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}
