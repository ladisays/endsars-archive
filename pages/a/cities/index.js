import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import CityTable from 'components/Cities/CityTable';
import { CityModal } from 'components/Cities/CityForm';
import useSubmit from 'hooks/useSubmit';
import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled, isIdle } from 'utils/operations';

const Cities = () => {
  const [show, setShow] = useState(false);
  const [activeCity, setActiveCity] = useState(null);
  const [{ loading, data: cities }, refetch] = useLazyAsync(
    () => axios.get('/api/cities'),
    { data: [] }
  );
  const [setDisabled] = useSubmit((id) =>
    axios.put(`/api/cities/${id}`, { disabled: true })
  );
  const onHide = () => {
    setActiveCity(null);
    setShow(false);
  };
  const onShow = (city = null) => () => {
    setActiveCity(city);
    setShow(true);
  };

  useEffect(() => {
    if (isIdle(loading)) {
      refetch();
    }
  }, [loading, refetch]);

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-between">
            <h4>Cities</h4>
            <Button onClick={onShow(null)}>Add city</Button>
          </div>
        </Col>
        <Col className="mt-3">
          {isPending(loading) && <Loading />}
          {isFulfilled(loading) && (
            <>
              {cities.length ? (
                <CityTable
                  cities={cities}
                  onShow={onShow}
                  setDisabled={setDisabled}
                />
              ) : (
                <Alert variant="info">There are no cities</Alert>
              )}
            </>
          )}
          {isFailed(loading) && (
            <Alert variant="danger">An error occurred!</Alert>
          )}
        </Col>
      </Row>
      {show && (
        <CityModal
          show={show}
          onHide={onHide}
          onUpdate={refetch}
          city={activeCity}
        />
      )}
    </>
  );
};

Cities.getLayout = getLayout;

export default Cities;
