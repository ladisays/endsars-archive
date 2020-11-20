export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};
export const ACTIONS = {
  FAILED: 'FAILED',
  FULFILLED: 'FULFILLED',
  PENDING: 'PENDING'
};
export const STATUS = {
  failed: 'failed',
  fulfilled: 'fulfilled',
  idle: 'idle',
  pending: 'pending'
};
export const isIdle = (status) => status === STATUS.idle;
export const isPending = (status) => status === STATUS.pending;
export const isFailed = (status) => status === STATUS.failed;
export const isFulfilled = (status) => status === STATUS.fulfilled;

export const buildError = (error, message = 'An error occurred') => ({
  error,
  message,
  success: false
});

export const buildData = (data) => ({
  data,
  success: true
});

export const methodNotAllowed = (res, allowedMethods = []) => {
  if (allowedMethods.length) {
    res.setHeader('Allow', allowedMethods);
  }
  return res.status(405).json(buildError(null, 'Method not allowed'));
};
