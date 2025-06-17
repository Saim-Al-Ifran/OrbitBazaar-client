export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
    firebaseUID: string;
    role: string;
    status:string;
    vendorRequestStatus:string
  };
}

export interface UpdateProfileRequest {
  name: string;
  phoneNumber: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
