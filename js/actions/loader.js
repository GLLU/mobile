
import type { Action } from './types';

export const LOADER = "LOADER";

export default function loader(isLoading:boolean):Action {
  console.log('action loader', LOADER);
  return {
    type: LOADER,
    payload: isLoading,
  };
}

