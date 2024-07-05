import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = ""

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (!error.config.url?.includes('/refresh')) {
      return handleError(error);
    }

    return error;
  }
);

// Handle global app errors
function handleError(error: AxiosError) {
  const { response } = error;

  switch (response?.status) {
    case 500: {
      // Handle InternalServerError
      break;
    }
    case 403: {
      // Handle Forbidden
      break;
    }
    case 401: {
      // Handle Unauthorized
      // on 401, redirect to login page.
      // refreshtokens etc are handled by express sessions,
      // so there should be no exception to this.
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      break;
    }
    case 429: {
      // Handle TooManyRequests
      break;
    }
  }

  return Promise.reject(error);
}

interface ApiServiceProps {
  baseURL?: string;
}

export function CreateService({ baseURL = '' }: ApiServiceProps) {
  const buildURL = (url: string) => `${baseURL}${url}`;
  return {
    get: <T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R> => instance.get(buildURL(url), config),
    post: <T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig
    ): Promise<R> => instance.post(buildURL(url), data, config),
    put: <T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig
    ): Promise<R> => instance.put(buildURL(url), data, config),
    delete: <T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R> => instance.delete(buildURL(url), config),
    request: <T = any, R = AxiosResponse<T>>(
      config: AxiosRequestConfig
    ): Promise<R> => instance.request(config),
  };
}

const ApiService = instance;

export default ApiService;
