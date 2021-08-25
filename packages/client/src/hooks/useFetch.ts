import { AxiosResponse, Method } from 'axios';
import axios from '../lib/axios';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import logger from 'use-reducer-logger';
import { NODE_ENV } from '../config';
import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../config/constants';
import {
  FetchActions,
  fetchInititalState,
  fetchReducer,
  FetchState,
} from '../reducers/fetch.reducer';
import { handleError } from '../utils';

export interface UseFetchProps<T, R> extends FetchState<R> {
  setBody: Dispatch<SetStateAction<T | null>>;
}

export function useFetch<T, R>(
  initalMethod: Method,
  initalUrl: string
): UseFetchProps<T, R> {
  const [{ result, isLoading, isError }, dispatch] = useReducer<
    (state: FetchState<R>, action: FetchActions<R>) => FetchState<R>
  >(
    NODE_ENV === 'development' ? logger(fetchReducer) : fetchReducer,
    fetchInititalState
  );
  const [body, setBody] = useState<T | null>(null);

  useEffect(() => {
    if (body === null) return;
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });
      try {
        const result: AxiosResponse<R> = await axios({
          method: initalMethod,
          url: initalUrl,
          data: body,
        });
        if (didCancel) return;
        dispatch({ type: FETCH_SUCCESS, payload: result });
      } catch (error) {
        if (didCancel) return;
        dispatch({ type: FETCH_FAILURE });
        handleError(error);
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [body, initalMethod, initalUrl, dispatch]);

  return { result, isLoading, isError, setBody };
}
