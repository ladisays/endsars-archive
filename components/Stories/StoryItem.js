import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { normalizeSlugs, formatEventDate } from 'utils/timeline';
import { Link } from 'components/Link';
import Media from './Media';
import styles from './story-item.module.sass';

export const StoryLink = ({ slug, children, className }) => {
  const { query } = useRouter();
  const { year, month, day, citySlug } = normalizeSlugs(query);
  const url = `/timeline/${year}/${month}/${day}/${citySlug}/${slug}`;

  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
};

const Story = ({ slug, description, title, media, ...story }) => {
  const { query } = useRouter();
  const showAll = query.f === undefined;
  const imageFilter = showAll || query.f === 'image';
  const videoFilter = showAll || query.f === 'video';
  const textFilter = showAll || query.f === 'text';

  return (
    <Col className={styles.root}>
      <Card className={styles.card}>
        <Card.Body className={styles.body}>
          <Card.Title>
            <StoryLink slug={slug} className={styles.link}>
              {title || 'No title'}
            </StoryLink>
          </Card.Title>
          {!!media.length && (imageFilter || videoFilter) && (
            <Media
              sources={media}
              imageFilter={imageFilter}
              videoFilter={videoFilter}
            />
          )}
          {description && textFilter && (
            <div data-media={showAll && !!media.length} className={styles.text}>
              <StoryLink slug={slug} className={styles.link}>
                {description}
              </StoryLink>
            </div>
          )}
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <div>{formatEventDate(story.eventDate)}</div>
          <div>{story.location}</div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Story;
