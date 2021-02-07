import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Icon from 'components/Icon';
import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import CityTable from 'components/Cities/CityTable';
import { CityModal } from 'components/Cities/CityForm';
import useSubmit from 'hooks/useSubmit';
import { useAsync } from 'hooks/useBaseAsync';
import useAuth from 'hooks/useAuth';
import { canVerify } from 'utils/roles';
import { isPending, isFailed, isFulfilled } from 'utils/operations';

const fetchCities = () => axios.get('/api/cities');

const Cities = () => {
  const [show, setShow] = useState(false);
  const [activeCity, setActiveCity] = useState(null);
  const { role } = useAuth();
  const [{ loading, data: cities }, refetch] = useAsync(fetchCities, {
    data: []
  });
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

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-between mt-4">
            <h2 className="m-0">Cities</h2>
            {canVerify(role) && (
              <Button variant="outline-primary" onClick={onShow(null)}>
                <Icon name="plus" iconCss="mr-2" />
                <span>Add city</span>
              </Button>
            )}
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
      {canVerify(role) && show && (
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
