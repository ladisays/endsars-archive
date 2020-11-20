import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
// import moment from 'moment';

// import Icon from 'components/Icon';
import { formatEventDate } from 'utils/timeline';
import Media from './Media';
import styles from './story-modal.module.sass';

const StoryModal = ({ id, title, description, ...story }) => {
  const { query, push } = useRouter();
  const slugs = [...query.slugs];
  slugs.pop();
  const url = slugs.join('/');
  const onHide = () => {
    push(url);
  };

  return (
    <Modal
      show
      onHide={onHide}
      size="lg"
      centered
      dialogClassName={styles.root}>
      <div>
        <div data-mode="modal">
          <Media detail sources={story.media} />
        </div>
        <div className={styles.content}>
          <div className={`${styles.title} h5`}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.meta}>
            <small>{formatEventDate(story.eventDate)}</small>
            <small>{story.location}</small>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoryModal;
