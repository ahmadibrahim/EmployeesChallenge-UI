import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosError
} from "axios";

export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_MULTIPLE_CHOICES = 300;
export const HTTP_STATUS_ERROR_RESPONSE = 500;

const BASE_URL = "http://localhost:9000/";

export type Response<T = never> = AxiosResponse<T> & {
  success: boolean;
  failed: boolean;
};

function validateStatus(status: number): boolean {
  return status >= HTTP_STATUS_OK && status < HTTP_STATUS_MULTIPLE_CHOICES;
}

function checkStatus(response: AxiosResponse): Response | null {
  const { status } = response;
  if (validateStatus(status)) {
    return {
      success: true,
      failed: false,
      ...(response as AxiosResponse<never>)
    };
  }
  const error = new Error(response.statusText);
  error.message = response.data;
  throw error;
}

function checkError(err: AxiosError): Response {
  const error: AxiosError = { ...err };
  return {
    success: false,
    failed: true,
    ...(error.response as AxiosResponse<never>)
  };
}

export default async function request(
  opt: AxiosRequestConfig,
  body: any
): Promise<Response | null> {
  const options: AxiosRequestConfig = { ...opt };

  options.data = body;
  try {
    const response = await axios(options);
    return checkStatus(response);
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return checkError(err);
    }
    return null;
  }
}

export const baseHttp = (
  method: Method,
  url: string,
  body?: any
): Promise<Response | null> => {
  const options: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Accept: "application/json,text/plain"
    }
  };
  return request(options, body);
};

export const httpGet = (url: string) => baseHttp("GET", `${BASE_URL}${url}`);

export const httpPost = (url: string, body: any) =>
  baseHttp("POST", `${BASE_URL}${url}`, body);

export const httpPut = (url: string, body: any) =>
  baseHttp("PUT", `${BASE_URL}${url}`, body);

export const httpDelete = (url: string, body?: any) =>
  baseHttp("DELETE", `${BASE_URL}${url}`, body);
