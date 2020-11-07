import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import { useRouter } from 'next/router';

import { NavLink } from 'components/Link';
import useStories from 'hooks/useStories';
import Nigeria from 'lib/nigeria.json';
import StoryItem from './StoryItem';
import styles from './story-list.module.sass';

const LocationsMenu = (
  { children, className, 'aria-labelledby': labelledBy },
  ref
) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);

  return (
    <div ref={ref} className={className} aria-labelledby={labelledBy}>
      <div className="mx-2 mb-2">
        <FormControl
          placeholder="Type to filter..."
          onChange={handleChange}
          value={value}
        />
      </div>
      <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
          (child) =>
            !value ||
            child.props.children.toLowerCase().startsWith(value.toLowerCase())
        )}
      </ul>
    </div>
  );
};

const locationsMenuRef = React.forwardRef(LocationsMenu);

const Locations = ({ className }) => {
  const { query } = useRouter();
  const [show, setShow] = useState(false);
  return (
    <Dropdown show={show} className={className}>
      <Dropdown.Toggle onClick={() => setShow((s) => !s)}>
        {query.loc ? Nigeria.states[query.loc].name : 'Select location'}
      </Dropdown.Toggle>
      <Dropdown.Menu as={locationsMenuRef}>
        {Object.values(Nigeria.states)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((state) => (
            <Dropdown.Item
              key={state.code}
              as={NavLink}
              href={{ pathname: '/', query: { loc: state.code } }}
              active={query.loc === state.code}
              onClick={() => setShow(false)}
              eventKey={state.code}>
              {state.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const StoryList = ({ error }) => {
  const [, stories] = useStories();

  return (
    <Row className={styles.root}>
      <Col xs={12}>
        <div className="d-flex flex-column flex-sm-row my-3">
          <div className={styles.filters}>
            <strong>Filter by type</strong>
            <div className="d-flex">
              <NavLink href="/">All</NavLink>
              <NavLink href="/?f=image">Images</NavLink>
              <NavLink href="/?f=video">Videos</NavLink>
              <NavLink href="/?f=text">Text</NavLink>
            </div>
          </div>
          <div className={styles.filters}>
            <strong>Filter by location</strong>
            <Locations className={styles.dropdown} />
          </div>
        </div>
      </Col>
      <Col>
        {error && (
          <Alert variant="danger">
            An error occurred while loading stories
          </Alert>
        )}
        {stories.length ? (
          <Row xs={1} md={2} lg={3}>
            {stories.map(
              (story) => story.active && <StoryItem key={story.id} {...story} />
            )}
          </Row>
        ) : (
          <Alert variant="info">There are no stories currently available</Alert>
        )}
      </Col>
    </Row>
  );
};

export default StoryList;
