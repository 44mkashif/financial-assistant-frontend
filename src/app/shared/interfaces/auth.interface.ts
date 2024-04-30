export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface ISignUpResponse {
  user_id: number;
  name: string;
  email: string;
  access_token: string;
}

export interface ISignUpApiResponse {
  data: ISignUpResponse;
  message: string;
}

export interface ILoginResponse {
  user_id: number;
  access_token: string;
}

export interface ILoginApiResponse {
  data: ILoginResponse;
  message: string;
}
