import { useReducer } from 'react';

const initialState = {
  error: '',
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return initialState;
    case 'FETCH':
      return {
        error: '',
        loading: true,
      };
    case 'FULLFILLED':
      return {
        ...state,
        loading: false,
      };
    case 'REJECTED':
      return {
        error: action.payload,
        loading: false,
      };
    default:
      throw new Error();
  }
}

export default function useFetchState() {
  const [{ error, loading }, dispatch] = useReducer(reducer, initialState);

  return [{ error, loading }, dispatch];
}
