export type HttpHeaders = { [key: string]: string };

export enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  del = "DELETE",
}

export interface FetchOption {
  method: HttpMethod;
  headers: HttpHeaders;
  body?: string | FormData;
}

export interface ApiCallStartLog {
  url: string;
  method: HttpMethod;
  headers: HttpHeaders;
  body?: object;
}

export interface ApiCallFinishedLog extends ApiCallStartLog {
  status: number;
  data: object;
}


export interface Response {
  success: boolean;
  message: string;
  data: Users[];
  error: null | string;
  totalPages:number;
  totalUsers:number;
  currentPage:number;
}
export interface Users {
   name:string,
 ext:number,
 phone:number,
 email:string,
 DoB:string,
 password:string,
 skills:[
  {field:string},
  {tags:[]}
 ]
}


export interface ResponseAvailable {
  success: boolean;
  message: string;
  data: {
    available:boolean,
    // userInfo:null,
  };
  error: null | string;
}

// Components Types





