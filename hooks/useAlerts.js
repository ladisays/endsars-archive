import { useContext } from 'react';

import AlertsContext from 'contexts/alerts';

const useAlerts = () => {
  const ctx = useContext(AlertsContext);

  return ctx;
};

export default useAlerts;
