import { AxiosResponse } from 'axios';
import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../config/constants';

export interface FetchState<R> {
  isLoading: boolean;
  isError: boolean;
  result: AxiosResponse<R> | null;
}

export type FetchActions<R> =
  | { type: typeof FETCH_INIT }
  | { type: typeof FETCH_SUCCESS; payload: AxiosResponse<R> }
  | { type: typeof FETCH_FAILURE };

export const fetchInititalState = {
  isLoading: false,
  isError: false,
  result: null,
};

export function fetchReducer<R>(
  state: FetchState<R>,
  action: FetchActions<R>
): FetchState<R> {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false, result: null };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        result: action.payload,
      };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error('Invalid Fetch Action');
  }
}
