import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

import { Link } from 'components/Link';
import Media from './Media';
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
  const { query } = useRouter();
  const showAll = query.f === undefined;
  const imageFilter = showAll || query.f === 'image';
  const videoFilter = showAll || query.f === 'video';
  const textFilter = showAll || query.f === 'text';

  return (
    <Col className={styles.root}>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <StoryLink id={id} className={styles.link}>
            {title || 'No title'}
          </StoryLink>
        </Card.Header>
        <Card.Body className={styles.body}>
          {!!media.length && (imageFilter || videoFilter) && (
            <Media
              sources={media}
              imageFilter={imageFilter}
              videoFilter={videoFilter}
            />
          )}
          {text && textFilter && (
            <div data-media={showAll && !!media.length} className={styles.text}>
              <StoryLink id={id} className={styles.link}>
                {text}
              </StoryLink>
            </div>
          )}
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <div>{formatTime(story)}</div>
          <div>{story.location || 'Unavailable'}</div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Story;
