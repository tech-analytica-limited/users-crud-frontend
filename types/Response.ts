import { AxiosError } from "axios";

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  error: null | string;
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
