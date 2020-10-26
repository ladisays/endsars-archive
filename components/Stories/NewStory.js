/* eslint-disable react/no-array-index-key */
import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { object, string } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import styles from './new-story.module.sass';

const validationSchema = object().shape({
  text: string()
});

const readMedia = (files) =>
  new Promise((resolve) => {
    const sources = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        sources.push({ file, src: reader.result });
      };
      reader.readAsDataURL(file);
    });
    resolve(sources);
  });

const NewStory = ({ show = false, onHide }) => {
  const formRef = useRef(null);
  const initialValues = {
    text: '',
    author: '',
    files: [],
    media: []
  };
  const onChange = (setFieldValue) => (event) => {
    const { files } = event.target;
    readMedia(files).then((sources) => setFieldValue('files', sources));
  };
  const [onSubmit] = useSubmit((values) => axios.post('/api/stories', values), {
    onCompleted() {
      formRef.current.resetForm();
      onHide();
    }
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share your story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          ref={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ values, setFieldValue, isSubmitting }) => (
            <>
              <Form.Control
                name="author"
                label="Your name"
                placeholder="John Doe"
              />
              <Form.Control
                name="text"
                as="textarea"
                label="Share your story"
                placeholder="Share your story in your own words"
              />
              <div className={styles.media}>
                <input
                  name="media-files"
                  type="file"
                  accept="image/*, video/*"
                  multiple
                  value=""
                  onChange={onChange(setFieldValue)}
                />
                <div className={styles.content}>
                  {values.files.map((file, i) => (
                    <div key={i} className={styles.imageFrame}>
                      <img src={file.src} alt={values.author} />
                    </div>
                  ))}
                </div>
                <div className={styles.message}>
                  <span>Upload your photos and videos</span>
                </div>
              </div>
              <Form.Button pending={isSubmitting}>Share</Form.Button>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewStory;
