import { getStatusTag } from 'utils/status';
import styles from './story-status.module.sass';

const StoryStatus = ({ status }) => {
  return (
    status !== undefined && (
      <span data-status={status} className={styles.root}>
        {getStatusTag(status)?.label}
      </span>
    )
  );
};

export default StoryStatus;
