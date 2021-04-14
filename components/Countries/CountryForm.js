import { useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { string, object } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import useAlerts from 'hooks/useAlerts';
import { cleanSlug } from 'utils/slugs';

const validationSchema = object().shape({
  id: string(),
  name: string().required('Name is required'),
  slug: string().required('Slug is required')
});

const CountryForm = ({ country, onUpdate, onHide }) => {
  const { showAlert } = useAlerts();
  const initialValues = useMemo(
    () => ({
      name: (country && country.name) || '',
      slug: (country && country.slug) || ''
    }),
    [country]
  );
  const [handleSubmit] = useSubmit(
    (values) => axios.post('/api/countries', values),
    {
      onCompleted() {
        onUpdate();
        onHide();
        const msg = country
          ? 'Update was successful'
          : 'The country has been created.';
        showAlert(msg);
      },
      onError(error) {
        console.log(error);
      }
    }
  );
  const [handleUpdate] = useSubmit(
    (values) => axios.put(`/api/countries/${country.id}`, values),
    {
      onCompleted() {
        onUpdate();
        onHide();
        const msg = country
          ? 'Update was successful'
          : 'The country has been created.';
        showAlert(msg);
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
      onSubmit={country ? handleUpdate : handleSubmit}>
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
            helpText="A url-friendly value for the country"
          />
          <Form.Button
            block
            size="sm"
            pending={isSubmitting}
            variant="success"
            className="mx-auto py-2 px-4 font-weight-bold">
            {country ? 'Update' : 'Create'}
          </Form.Button>
        </>
      )}
    </Form>
  );
};

export const CountryModal = ({ onUpdate, onHide, show, country }) => (
  <Modal show={show} centered scrollable onHide={onHide}>
    <Modal.Header closeButton>
      <strong>{country ? 'Update country' : 'Add a new country'}</strong>
    </Modal.Header>
    <Modal.Body>
      <CountryForm country={country} onHide={onHide} onUpdate={onUpdate} />
    </Modal.Body>
  </Modal>
);

export default CountryForm;
