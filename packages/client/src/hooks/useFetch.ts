import { AxiosResponse, Method, AxiosError, AxiosRequestConfig } from 'axios';
import axios from '../lib/axios';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { NODE_ENV } from '../config';
import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../config/constants';
import {
  FetchActions,
  fetchInititalState,
  fetchReducer,
  FetchState,
} from '../reducers/fetch.reducer';
import { ReducerLogger } from './useReducerLogger';

export interface UseFetchProps<T, R, E> extends FetchState<R, E> {
  body: T | null;
  setBody: Dispatch<SetStateAction<T | null>>;
}

export function useFetch<T, R, E>(
  initalMethod: Method,
  initalUrl: string
): UseFetchProps<T, R, E> {
  const [{ result, isLoading, isError, errors }, dispatch] = useReducer<
    (state: FetchState<R, E>, action: FetchActions<R, E>) => FetchState<R, E>
  >(
    NODE_ENV === 'development' ? ReducerLogger(fetchReducer) : fetchReducer,
    fetchInititalState
  );
  const [body, setBody] = useState<T | null>(null);

  useEffect(() => {
    if (body === null) return;
    let didCancel = false;
    const fetchData = () => {
      dispatch({ type: FETCH_INIT });
      axios({
        method: initalMethod,
        url: initalUrl,
        data: body,
      } as AxiosRequestConfig)
        .then((result: AxiosResponse<R>) => {
          if (didCancel) return;
          dispatch({ type: FETCH_SUCCESS, payload: result });
        })
        .catch((error: AxiosError<E>) => {
          if (didCancel) return;

          if (error.response) {
            dispatch({ type: FETCH_FAILURE, payload: error.response.data });
          } else {
            dispatch({ type: FETCH_FAILURE, payload: null });
          }
        });
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [body, initalMethod, initalUrl, dispatch]);

  return { result, isLoading, isError, errors, body, setBody };
}
