export interface SuccessLoginI {
  message: string;
  user: UserResponse;
  token: string;
}
export interface FailedLoginI {
  message: string;
  statusMsg: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role: string;
}
