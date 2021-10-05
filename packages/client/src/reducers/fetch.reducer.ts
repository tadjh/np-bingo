import { AxiosResponse } from 'axios';
import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../config/constants';

export interface FetchState<R, E> {
  isLoading: boolean;
  isError: boolean;
  result: AxiosResponse<R> | null;
  errors: AxiosResponse<E>['data'] | null;
}

export type FetchActions<R, E> =
  | { type: typeof FETCH_INIT }
  | { type: typeof FETCH_SUCCESS; payload: AxiosResponse<R> }
  | { type: typeof FETCH_FAILURE; payload: AxiosResponse<E>['data'] | null };

export const fetchInititalState = {
  isLoading: false,
  isError: false,
  result: null,
  errors: null,
};

export function fetchReducer<R, E>(
  state: FetchState<R, E>,
  action: FetchActions<R, E>
): FetchState<R, E> {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        result: null,
        errors: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        result: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload,
      };
    default:
      throw new Error('Invalid Fetch Action');
  }
}
