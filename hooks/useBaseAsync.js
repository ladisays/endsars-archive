import { useCallback, useReducer, useEffect, useRef } from 'react';

import { ACTIONS, STATUS, isIdle } from 'utils/operations';

const $fn = () => new Promise();
const $initialState = {
  loading: STATUS.idle,
  data: undefined,
  error: undefined,
  onError: undefined,
  onCompleted: undefined
};
const reducer = (state = $initialState, [type, payload]) => {
  switch (type) {
    case ACTIONS.RESET:
      return {
        ...state,
        loading: STATUS.idle
      };
    case ACTIONS.PENDING:
      return {
        ...state,
        loading: STATUS.pending
      };
    case ACTIONS.FULFILLED:
      return {
        ...state,
        loading: STATUS.fulfilled,
        data: payload,
        error: undefined
      };
    case ACTIONS.FAILED:
      return {
        ...state,
        loading: STATUS.failed,
        error: payload
      };
    default:
      return state;
  }
};

export const useBaseAsync = (
  fn = $fn,
  initialState = $initialState,
  lazy = false
) => {
  const mounted = useRef(false);

  const initiator = useRef(fn);
  const options = { ...$initialState, ...initialState };
  const [state, dispatch] = useReducer(reducer, options);
  const { onCompleted, onError } = state;
  const execute = useCallback(
    async (...args) => {
      dispatch([ACTIONS.PENDING]);

      try {
        const result = await Promise.resolve(initiator.current(...args));

        if (mounted.current) {
          if (typeof onCompleted === 'function') {
            onCompleted(result.data);
          }
          dispatch([ACTIONS.FULFILLED, result.data]);
        }
      } catch (e) {
        if (mounted.current) {
          if (typeof onError === 'function') {
            onError(e);
          }
          dispatch([ACTIONS.FAILED, e]);
        }
      }
    },
    [onCompleted, onError]
  );

  useEffect(() => {
    mounted.current = true;

    if (!lazy && isIdle(state.loading)) {
      execute();
    }

    return () => {
      mounted.current = false;
    };
  }, [execute, lazy, state.loading]);

  useEffect(() => {
    if (initiator.current !== fn) {
      initiator.current = fn;
      dispatch([ACTIONS.RESET]);
    }
  }, [fn]);

  return [state, execute];
};

export const useAsync = (fn = $fn, initialState = $initialState) =>
  useBaseAsync(fn, initialState, false);

export const useLazyAsync = (fn = $fn, initialState = $initialState) =>
  useBaseAsync(fn, initialState, true);
