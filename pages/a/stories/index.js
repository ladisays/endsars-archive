import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { useAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled } from 'utils/operations';
import StoryTable from 'components/Stories/StoryTable';
import { getLayout } from 'components/Layouts/Admin';
import Loading from 'components/Loading';
import { Link } from 'components/Link';

const Stories = () => {
  const [{ loading, data: stories }, refetch] = useAsync(
    () => axios.get('/api/stories'),
    { data: [] }
  );

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex justify-content-between">
          <h4>Stories</h4>
          <Link href="/new">Add story</Link>
        </div>
      </Col>
      <Col xs={12} className="mt-3">
        {isPending(loading) && <Loading />}
        {isFailed(loading) && (
          <Alert variant="danger">
            An error occurred while loading stories
          </Alert>
        )}
        {isFulfilled(loading) && (
          <>
            {stories.length ? (
              <StoryTable stories={stories} onUpdate={refetch} />
            ) : (
              <Alert variant="info">
                There are no stories currently available
              </Alert>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

Stories.getLayout = getLayout;

export default Stories;
