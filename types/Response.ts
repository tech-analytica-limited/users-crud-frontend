import { AxiosError } from "axios";

export interface Response<T> {
   success: boolean;
  message: string;
  data: T;
  error: null | string;
}


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

export interface ImgResponse {
  success: boolean;
  message: string;
  data: {
    urls: string[];
  };
  error: string | null;
};
export type ErrorResponse = AxiosError<Response<{}> | undefined>;
