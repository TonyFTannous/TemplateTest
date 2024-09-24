import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CanceledError,
  InternalAxiosRequestConfig,
} from 'axios';
import {useCallback, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TCancelToken = {
  createNewController: (override?: boolean) => AbortController;
  isCancel: (value: any) => boolean;
  cancelRequest: () => void;
};

export const useAxiosController = (): TCancelToken => {
  const abortReason = useRef<string>('');
  const axiosSource = useRef<AbortController>();
  //**  I used initialized variable to prevent execution of useEffect twice in dev mode
  //**  due to the using of React.StrictMode
  const initialized = useRef<boolean>(!__DEV__);

  const createNewController = useCallback((override?: boolean) => {
    if (!axiosSource.current || override) {
      const controller = new AbortController();
      axiosSource.current = controller;
    }
    return axiosSource.current;
  }, []);

  const isCancel = useCallback((reason?: any) => {
    if (axiosSource.current) {
      if (reason) {
        const isAborted = reason instanceof CanceledError;
        if (isAborted && __DEV__) {
          // eslint-disable-next-line no-console
          console.log(abortReason.current || reason.message);
        }
        return isAborted;
      }
      const isAborted = axiosSource.current.signal.aborted;
      if (isAborted && __DEV__) {
        // eslint-disable-next-line no-console
        console.log(
          abortReason.current || reason instanceof Error
            ? reason.message
            : reason,
        );
      }
      return isAborted;
    }
    return false;
  }, []);

  const cancelRequest = useCallback(() => {
    if (axiosSource.current) {
      abortReason.current =
        'The ongoing requests has been canceled by the user';
      axiosSource.current.abort();
      axiosSource.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (initialized.current === true && axiosSource.current) {
        // unmount handler to cancel ongoing requests if still remaining
        abortReason.current = 'Cancel ongoing requests (Unmount Component)';
        axiosSource.current.abort();
        axiosSource.current = undefined;
      } else {
        initialized.current = true;
      }
    };
  }, []);

  return {createNewController, isCancel, cancelRequest};
};

const handleRequest = async (request: InternalAxiosRequestConfig) => {
  let accessToken;
  try {
    if (request.headers.get('skip-token-check')) {
      return request;
    }
    accessToken = await AsyncStorage.getItem('token');
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('accessToken: ', accessToken);
    }
  } catch (error: any) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
    return Promise.reject({message: error.message});
  }
  if (!accessToken) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('Access token not found');
    }
    return Promise.reject({message: 'Access token not found'});
  }
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
};

const handleResponse = (response: AxiosResponse) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  response.headers['Access-Control-Allow-Origin'] = '*';
  return response;
};

const handleError = (error: AxiosError) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (__DEV__ && error.status === 401) {
    // eslint-disable-next-line no-console
    console.warn('Unauthorized request, no token!! or session has expired!!');
  }
  return Promise.reject(error);
};

const setInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      return handleRequest(request);
    },
    (error: AxiosError) => {
      return handleError(error);
    },
  );
  axiosInstance.interceptors.response.use(
    response => {
      return handleResponse(response);
    },
    (error: AxiosError) => {
      return handleError(error);
    },
  );
};

const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 60000, // = 1min
});

setInterceptors(axiosInstance);

export default axiosInstance;
