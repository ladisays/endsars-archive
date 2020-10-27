/* eslint-disable react/no-array-index-key */
import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { object, string } from 'yup';

import { initFirebase, storageRef } from 'utils/firebase';
import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import MediaButton from './MediaButton';
import styles from './new-story.module.sass';

initFirebase();

export const uploadFile = (source) =>
  new Promise((resolve) => {
    let ref;
    const mediaRef = storageRef().child('media');
    const imagesRef = mediaRef.child('images');
    const videosRef = mediaRef.child('videos');

    if (source.file.type.startsWith('image/')) {
      ref = imagesRef.child(source.file.name);
    } else if (source.file.type.startsWith('video/')) {
      ref = videosRef.child(source.file.name);
    }

    const task = ref.put(source.file);
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(source.file.name, `Upload is ${progress}% done`);
    });
    resolve({ ref, task });
  });

const validationSchema = object().shape({
  text: string()
});

const NewStory = ({ show = false, onHide }) => {
  const formRef = useRef(null);
  const initialValues = {
    text: '',
    author: '',
    media: []
  };
  const [onSubmit] = useSubmit(
    (values) => {
      let tasks;

      if (values.media.length) {
        console.log('we have media to upload');
        const promises = values.media.map(uploadFile);
        tasks = Promise.all(promises);
      }

      return Promise.resolve()
        .then(tasks)
        .then(() => axios.post('/api/stories', values));
    },
    {
      onCompleted() {
        formRef.current.resetForm();
        onHide();
      },
      onError(err) {
        console.error(err);
      }
    }
  );

  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Form
        ref={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ values, isSubmitting }) => (
          <>
            <Modal.Header closeButton />
            <Modal.Body>
              <Form.Control
                name="author"
                label="Your name"
                placeholder="John Doe"
              />
              <Form.Control
                name="text"
                as="textarea"
                label="Share your story"
                placeholder="Tell us what happened..."
              />
              <div className={styles.mediaContent}>
                {values.media.map((m, i) => (
                  <div key={i} className={styles.mediaFrame}>
                    {m.file.type.startsWith('image/') && (
                      <img src={m.src} alt={values.author} />
                    )}
                    {m.file.type.startsWith('video/') && (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video controls playsInline preload="auto">
                        <source src={m.src} type={m.file.type} />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
              <MediaButton />
              <Form.Button pending={isSubmitting}>Share</Form.Button>
            </Modal.Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default NewStory;
