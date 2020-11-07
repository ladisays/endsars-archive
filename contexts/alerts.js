import { createContext, useReducer, useCallback, useMemo } from 'react';

import { generateId } from 'utils/slugs';

const AlertsContext = createContext({
  alerts: [],
  showAlert: () => {},
  hideAlert: () => {}
});

const types = {
  show: 'show',
  hide: 'hide'
};

const createAlert = (message) => {
  let text;
  let title;
  let variant;

  if (typeof message === 'string') {
    text = message;
  } else {
    text = message.text;
    title = message.title || '';
    variant = message.variant || 'success';
  }
  return {
    id: generateId(),
    text,
    title,
    variant
  };
};

const reducer = (alerts = [], [type, payload]) => {
  switch (type) {
    case types.show:
      return [...alerts, payload];
    case types.hide:
      return alerts.filter((item) => item.id !== payload);
    default:
      return alerts;
  }
};

export const AlertsProvider = (props) => {
  const [alerts, dispatch] = useReducer(reducer, []);

  const showAlert = useCallback(
    (message) => dispatch([types.show, createAlert(message)]),
    [dispatch]
  );
  const hideAlert = useCallback((id) => dispatch([types.hide, id]), [dispatch]);

  const contextValue = useMemo(
    () => ({
      alerts,
      showAlert,
      hideAlert
    }),
    [alerts, hideAlert, showAlert]
  );
  return <AlertsContext.Provider value={contextValue} {...props} />;
};

export default AlertsContext;
