import { useRef, useEffect } from 'react';
import RBAlert from 'react-bootstrap/Alert';

import useAlerts from 'hooks/useAlerts';
import styles from './alert.module.sass';

export const Alert = ({ id, title, text, variant }) => {
  const { hideAlert } = useAlerts();
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => hideAlert(id), 5000);

    return () => {
      clearTimeout(timeout.current);
      timeout.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RBAlert variant={variant} onClose={() => hideAlert(id)} dismissible>
      {title && <RBAlert.Heading>{title}</RBAlert.Heading>}
      <div>{text}</div>
    </RBAlert>
  );
};

const Alerts = () => {
  const { alerts } = useAlerts();

  return (
    <div className={styles.root}>
      {alerts.map((item) => (
        <Alert key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Alerts;
