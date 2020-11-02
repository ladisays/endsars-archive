import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { useAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled } from 'utils/operations';
import { NavLink } from 'components/Link';
import StoryTable from 'components/Stories/StoryTable';

const Stories = () => {
  const [{ loading, data: stories }] = useAsync(
    () => axios.get('/api/stories'),
    { data: [] }
  );

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div>
            <strong>Filter by type</strong>
            <div className="d-flex">
              <NavLink href="/a/photos">Photos</NavLink>
              <NavLink href="/a/videos">Videos</NavLink>
              <NavLink href="/a/text">Text</NavLink>
            </div>
          </div>
          <div>
            <strong>Filter by location</strong>
            <div>Dropdown here...</div>
          </div>
        </Col>
        <Col>
          {isPending(loading) && <Spinner animation="border" />}
          {isFailed(loading) && (
            <div>An error occurred while loading stories</div>
          )}
          {isFulfilled(loading) && (
            <>
              {stories.length ? (
                <StoryTable stories={stories} />
              ) : (
                <div>There are no stories currently available</div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Stories;
