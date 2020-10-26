export const methodNotAllowed = (res, allowedMethods = []) => {
  if (allowedMethods.length) {
    res.setHeader('Allow', allowedMethods);
  }
  return res.status(405).end('Method not allowed');
};
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
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
