
export interface  LoginInput {
    email: string;
    password: string;
  }

export interface UserRegisterInput {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }

export interface  LoginResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            email: string;
            role: string;
        };
    };
}

export interface UserRegisterResponse extends LoginResponse{}; 
export interface VendorRegisterResponse extends LoginResponse{};
export interface VendorRegisterInput extends UserRegisterInput {};
export interface RefreshTokenInput {
   refreshToken: string;
}
export interface RefreshTokenResponse extends LoginResponse{};
export interface FirebaseLoginInput{
    idToken: string;
};
export interface ProfileResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        image: string;
    }
}
export interface UpdateProfileRequest {
    name: string;
    phoneNumber: string;
  }
  export interface ProfileUpdateResponse {
    message: string;
    data: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string;
    };
  }

