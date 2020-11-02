/* eslint-disable react/no-array-index-key */
import { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import { object, string } from 'yup';

import { initFirebase, storageRef } from 'utils/firebase';
import { generateId } from 'utils/slugs';
import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import MediaButton from './MediaButton';
import styles from './new-story.module.sass';

initFirebase();

const createFile = (file) => {
  const re = /(?:\.([^.]+))?$/;
  const result = re.exec(file.name);
  const ext = result[0].toLowerCase();
  const name = generateId() + ext;

  return new File([file], name, {
    lastModified: file.lastModified,
    type: file.type
  });
};

export const uploadFile = (setState) => (source, idx) =>
  new Promise((resolve, reject) => {
    let ref;
    const mediaRef = storageRef().child('media');
    const imagesRef = mediaRef.child('images');
    const videosRef = mediaRef.child('videos');
    const file = createFile(source.file, source.type);

    if (source.type === 'image') {
      ref = imagesRef.child(file.name);
    } else if (source.type === 'video') {
      ref = videosRef.child(file.name);
    }

    const task = ref.put(file);

    task.on(
      'state_changed',
      (snap) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        setState((s) => ({ ...s, [idx]: progress }));
      },
      (err) => {
        console.log(err);
        setState((s) => ({ ...s, [idx]: 0 }));
        reject(err);
      },
      async () => {
        const src = await task.snapshot.ref.getDownloadURL();
        const path = ref.fullPath;
        resolve({
          src,
          path,
          position: idx,
          type: source.type,
          mimetype: source.file.type
        });
      }
    );
  });

const validationSchema = object().shape({
  title: string().required('Title is required'),
  text: string(),
  author: string(),
  location: string()
});

const NewStory = ({ show = false, onHide }) => {
  const [state, setState] = useState({});
  const formRef = useRef(null);
  const initialValues = {
    text: '',
    author: '',
    title: '',
    media: []
  };
  const [onSubmit] = useSubmit(
    async (values) => {
      let media = [];

      if (values.media.length) {
        console.log('we have media to upload');
        const promises = values.media.map(uploadFile(setState));
        media = await Promise.all(promises);
      }

      return axios.post('/api/stories', {
        ...values,
        media
      });
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
                name="title"
                label="Title"
                placeholder="A short description"
              />
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
                    {m.type === 'image' && (
                      <img src={m.src} alt={values.author} />
                    )}
                    {m.type === 'video' && (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video controls playsInline preload="auto">
                        <source src={m.src} type={m.file.type} />
                      </video>
                    )}
                    <ProgressBar
                      animated={state[i] !== 100}
                      striped={state[i] !== 100}
                      now={state[i] || 0}
                      className={styles.progress}
                    />
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
