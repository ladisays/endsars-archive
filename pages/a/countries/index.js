import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Icon from 'components/Icon';
import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import CountryTable from 'components/Countries/CountryTable';
import { CountryModal } from 'components/Countries/CountryForm';
import useSubmit from 'hooks/useSubmit';
import { useAsync } from 'hooks/useBaseAsync';
import useAuth from 'hooks/useAuth';
import { canVerify } from 'utils/roles';
import { isPending, isFailed, isFulfilled } from 'utils/operations';

const fetchCountries = () => axios.get('/api/countries');

const Countries = () => {
  const [show, setShow] = useState(false);
  const [activeCountry, setActiveCountry] = useState(null);
  const { role } = useAuth();
  const [{ loading, data: countries }, refetch] = useAsync(fetchCountries, {
    data: []
  });
  const [setDisabled] = useSubmit((id) =>
    axios.put(`/api/countries/${id}`, { disabled: true })
  );
  const onHide = () => {
    setActiveCountry(null);
    setShow(false);
  };
  const onShow = (country = null) => () => {
    setActiveCountry(country);
    setShow(true);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-between mt-4">
            <h2 className="m-0">Countries</h2>
            {canVerify(role) && (
              <Button variant="outline-primary" onClick={onShow(null)}>
                <Icon name="plus" iconCss="mr-2" />
                <span>Add country</span>
              </Button>
            )}
          </div>
        </Col>
        <Col className="mt-3">
          {isPending(loading) && <Loading />}
          {isFulfilled(loading) && (
            <>
              {countries.length ? (
                <CountryTable
                  countries={countries}
                  onShow={onShow}
                  setDisabled={setDisabled}
                />
              ) : (
                <Alert variant="info">There are no countries</Alert>
              )}
            </>
          )}
          {isFailed(loading) && (
            <Alert variant="danger">An error occurred!</Alert>
          )}
        </Col>
      </Row>
      {canVerify(role) && show && (
        <CountryModal
          show={show}
          onHide={onHide}
          onUpdate={refetch}
          country={activeCountry}
        />
      )}
    </>
  );
};

Countries.getLayout = getLayout;

export default Countries;
