import { UserResponse } from "./login";

export interface UpdateUserDataI {
  message: string;
  user: UserResponse;
}

export interface FailedUpdateUserDataI {
  message: string;
  errors: Errors;
}

export interface Errors {
  value: string;
  msg: string;
  param: string;
  location: string;
}
