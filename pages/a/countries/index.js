import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import CountryTable from 'components/Countries/CountryTable';
import { CountryModal } from 'components/Countries/CountryForm';
import useSubmit from 'hooks/useSubmit';
import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled, isIdle } from 'utils/operations';

const Countries = () => {
  const [show, setShow] = useState(false);
  const [activeCountry, setActiveCountry] = useState(null);
  const [{ loading, data: countries }, refetch] = useLazyAsync(
    () => axios.get('/api/countries'),
    { data: [] }
  );
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
            <h4>Countries</h4>
            <Button onClick={onShow(null)}>Add country</Button>
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
      {show && (
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
