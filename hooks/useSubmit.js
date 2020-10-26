import { useReducer } from 'react';

import { ACTIONS, STATUS } from 'utils/operations';

const initialState = {
  submitting: STATUS.idle,
  data: undefined,
  error: undefined
};
const submitFn = (variables) => new Promise(variables);
const reducer = (state = initialState, [type, payload]) => {
  switch (type) {
    case ACTIONS.PENDING:
      return {
        ...state,
        submitting: STATUS.pending
      };
    case ACTIONS.FULFILLED:
      return {
        ...state,
        error: undefined,
        submitting: STATUS.fulfilled,
        data: payload
      };
    case ACTIONS.FAILED:
      return {
        ...state,
        submitting: STATUS.failed,
        error: payload
      };
    default:
      return state;
  }
};

const useSubmit = (submit = submitFn, options = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (...submitOptions) => {
    dispatch([ACTIONS.PENDING]);

    try {
      const result = await Promise.resolve(submit(...submitOptions));
      dispatch([ACTIONS.FULFILLED, result.data]);
      if (typeof options.onCompleted === 'function') {
        options.onCompleted(result.data);
      }
    } catch (error) {
      dispatch([ACTIONS.FAILED, error]);
      if (typeof options.onError === 'function') {
        options.onError(error);
      }
    }
  };

  return [handleSubmit, state];
};

export default useSubmit;
