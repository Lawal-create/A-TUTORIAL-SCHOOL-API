export interface LoginUserRequestData {
  email: string;
  password: string;
  role: string;
  gender: string;
  phoneNumber: string;
}

export interface SignupUserRequestData extends LoginUserRequestData {
  profileImageUrl?: string;
  firstName: string;
  lastName: string;
}
