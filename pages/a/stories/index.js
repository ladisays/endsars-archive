import { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled } from 'utils/operations';
import StoryTable from 'components/Stories/StoryTable';
import NewStory from 'components/Stories/NewStory';
import { getLayout } from 'components/Layouts/Admin';
import Loading from 'components/Loading';

const Stories = () => {
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onHide = () => setShow(false);
  const [{ loading, data: stories }, refetch] = useAsync(
    () => axios.get('/api/stories'),
    { data: [] }
  );

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex justify-content-between">
          <h4>Stories</h4>
          <Button onClick={onShow}>Add story</Button>
        </div>
      </Col>
      <Col xs={12} className="mt-3">
        {isPending(loading) && <Loading />}
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
      {show && (
        <NewStory admin show={show} onHide={onHide} onSuccess={refetch} />
      )}
    </Row>
  );
};

Stories.getLayout = getLayout;

export default Stories;
