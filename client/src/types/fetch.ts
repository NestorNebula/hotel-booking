type Method = 'get' | 'post' | 'put' | 'delete';

interface RequestOptions {
  body: string;
  credentials: 'include';
  headers: {
    [key: string]: string;
  };
  method: Method;
  mode: 'cors';
}

type APIResponse<Data> = SuccessfulResponse<Data> | ErrorResponse;

interface SuccessfulResponse<Data> {
  result: Data;
  error: false;
}

interface ErrorResponse {
  result: WithSperror | WithErrors;
  error: true;
}

interface WithSperror {
  error: Sperror;
  errors: undefined;
}

interface WithErrors {
  error: undefined;
  errors: { msg: string }[];
}

interface Sperror extends Error {
  title: string;
  msg?: string;
  statusCode: number;
}

export type { APIResponse, Method, RequestOptions };
