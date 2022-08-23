export interface UserLogin {
  email: string;
  password: string;
  data?: { errors?: [{ message: string }] };
}
export interface User {
  userId: string;
  token: string;
  tokenExpiration: number;
  email: string;
  createdEvents: any[];
}
export interface UserSignUp {
  email: string;
  password: string;
  confirmPassword?: string;
  terms?: boolean;
  offers?: boolean;
  error?: boolean;
  errors?: [{ message: string }];
  data?: { emailCheck?: { found: boolean } };
  found?: boolean;
}
export interface ErrorLogin {
  data: { errors?: [{ message: string }] };
}
