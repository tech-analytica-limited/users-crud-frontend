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

<<<<<<< HEAD
export type UsersApiResponse = {
  users: Users[];
  currentPage: number;
  limit: number;
  totalAds: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export interface Users {
  id:string,
 name:string,
 ext:number,
 phone:number,
 email:string,
 dateOfBirth:string,
 password:string,
}
=======
export type UserCreationResponse = Response<UserCreationData>;
>>>>>>> 00d321bca864d07acaf4050a5cb903ff7e591ab4

export interface ImgResponse {
  success: boolean;
  message: string;
  data: {
    urls: string[];
  };
  error: string | null;
};
export type ErrorResponse = AxiosError<Response<{}> | undefined>;
