import { AxiosError } from "axios";

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  error: null | string;
}

export interface UserCreationData {
  id: string;
  name: string;
  ext: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  password: string;
  skills: Array<{
    tags: string[];
    field: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export type UserCreationResponse = Response<UserCreationData>;

export interface ImgResponse {
  success: boolean;
  message: string;
  data: {
    urls: string[];
  };
  error: string | null;
};
export type ErrorResponse = AxiosError<Response<{}> | undefined>;
