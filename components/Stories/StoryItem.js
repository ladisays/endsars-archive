import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

import { Link } from 'components/Link';
import { MediaItem } from './Media';
import styles from './story-item.module.sass';

export const formatTime = (story = {}) => {
  const timestamp = story.eventDate || story.createdAt;

  return moment(timestamp).fromNow();
};

export const StoryLink = ({ id, children, className }) => (
  <Link href="/stories/[id]" as={`/stories/${id}`} className={className}>
    {children}
  </Link>
);

const Story = ({ id, text, title, media, ...story }) => {
  return (
    <Col className={styles.root}>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <StoryLink id={id} className={styles.link}>
            {title || 'No title'}
          </StoryLink>
        </Card.Header>
        <Card.Body className={styles.body}>
          {!!media.length && (
            <MediaItem className={styles.media} {...media[0]} />
          )}
          {text && (
            <div className={styles.text}>
              <StoryLink id={id} className={styles.link}>
                {text}
              </StoryLink>
            </div>
          )}
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <div>{formatTime(story)}</div>
          <div>Location</div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Story;
