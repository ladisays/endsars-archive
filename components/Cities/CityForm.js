import { useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { string, object } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import { useAsync } from 'hooks/useBaseAsync';
import useAlerts from 'hooks/useAlerts';
import { cleanSlug } from 'utils/slugs';
import { isFulfilled } from 'utils/operations';

const validationSchema = object().shape({
  id: string(),
  name: string().required('Name is required'),
  slug: string().required('Slug is required'),
  country: string().required('Country is required')
});

const CityForm = ({ city, onUpdate, onHide }) => {
  const [{ loading, data: countries }] = useAsync(
    () => axios.get('/api/countries'),
    { data: [] }
  );
  const { showAlert } = useAlerts();
  const initialValues = useMemo(
    () => ({
      name: (city && city.name) || '',
      slug: (city && city.slug) || '',
      country: (city && city.country.id) || ''
    }),
    [city]
  );
  const [handleSubmit] = useSubmit(
    (values) => axios.post('/api/cities', values),
    {
      onCompleted() {
        onUpdate();
        onHide();
        showAlert('The city has been created.');
      },
      onError(error) {
        console.log(error);
      }
    }
  );
  const [handleUpdate] = useSubmit(
    (values) => axios.put(`/api/cities/${city.id}`, values),
    {
      onCompleted() {
        onUpdate();
        onHide();
        showAlert('Update was successful');
      },
      onError(error) {
        console.log(error);
      }
    }
  );

  return (
    <Form
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={city ? handleUpdate : handleSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <>
          <Form.Control
            name="name"
            label="Name"
            onChange={(e) => {
              setFieldValue('name', e.target.value);
              setFieldValue('slug', cleanSlug(e.target.value));
            }}
          />
          <Form.Control
            name="slug"
            label="Slug"
            helpText="A url-friendly value for the city"
          />
          <Form.Control as="select" name="country" label="Country">
            {isFulfilled(loading) &&
              countries.map((country) => (
                <Form.Control.Option
                  key={country.id}
                  id={country.id}
                  label={country.name}
                />
              ))}
          </Form.Control>
          <Form.Button
            block
            size="sm"
            pending={isSubmitting}
            variant="success"
            className="mx-auto py-2 px-4 font-weight-bold">
            {city ? 'Update' : 'Create'}
          </Form.Button>
        </>
      )}
    </Form>
  );
};

export const CityModal = ({ onUpdate, onHide, show, city }) => (
  <Modal show={show} centered scrollable onHide={onHide}>
    <Modal.Header closeButton>
      <strong>{city ? 'Update city' : 'Add a new city'}</strong>
    </Modal.Header>
    <Modal.Body>
      <CityForm city={city} onHide={onHide} onUpdate={onUpdate} />
    </Modal.Body>
  </Modal>
);

export default CityForm;
