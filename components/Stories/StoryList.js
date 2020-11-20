import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';

import { normalizeSlugs } from 'utils/timeline';
import { DayTitle } from 'components/Timeline';
import useStories from 'hooks/useStories';
import StoryItem from './StoryItem';
import styles from './story-list.module.sass';

export const StoryListTitle = ({ dates = [] }) => {
  const { query, push } = useRouter();
  const { year, month, day, citySlug } = normalizeSlugs(query);
  const date = `${year}-${month}-${day}`;
  const m = dates.find((item) => item.date === `${year}-${month}`);
  const d = m.timeline.find((item) => item.date === date);
  const { cities } = d || { cities: [] };
  const { name } = cities.find((city) => city.slug === citySlug) || {
    name: ''
  };
  const handleSelect = (key) => {
    push('/stories/[[...slugs]]', `/stories/${year}/${month}/${day}/${key}`);
  };

  return (
    <Row>
      <Col>
        <Nav className="mx-auto">
          <DayTitle date={date} />
          {cities.length && (
            <>
              {cities.length > 1 ? (
                <NavDropdown
                  id="story-list-drp"
                  title={name || 'Select location'}
                  onSelect={handleSelect}>
                  {cities.map((city) => (
                    <NavDropdown.Item
                      key={city.id}
                      eventKey={city.slug}
                      active={city.slug === citySlug}>
                      {city.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <div className="py-2 px-3">{cities[0].name}</div>
              )}
            </>
          )}
        </Nav>
      </Col>
    </Row>
  );
};

const StoryList = ({ error }) => {
  const [, stories] = useStories();

  return (
    <Row className={styles.root}>
      <Col className="my-3">
        {error && (
          <Alert variant="danger">
            An error occurred while loading stories
          </Alert>
        )}
        {stories.length ? (
          <Row xs={1} md={2} lg={3}>
            {stories.map((story) => (
              <StoryItem key={story.id} {...story} />
            ))}
          </Row>
        ) : (
          <Alert variant="info">There are no stories currently available</Alert>
        )}
      </Col>
    </Row>
  );
};

export default StoryList;
