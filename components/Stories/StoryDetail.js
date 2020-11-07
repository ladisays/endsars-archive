import Media from './Media';
import { formatTime } from './StoryItem';
import styles from './story-detail.module.sass';

const StoryDetail = ({ id, title, text, ...story }) => {
  return (
    <div className={styles.root}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Media detail sources={story.media} />
      <div className={styles.footer}>
        <div>{formatTime(story)}</div>
        <div>{story.location || 'Unavailable'}</div>
      </div>
    </div>
  );
};

export default StoryDetail;
