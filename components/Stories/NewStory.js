/* eslint-disable react/no-array-index-key */
import { useRef, useState, useMemo } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { FieldArray } from 'formik';
import { bool, object, string } from 'yup';
import moment from 'moment';

import { storageRef } from 'utils/firebase';
import { cleanSlug, generateId } from 'utils/slugs';
import { isFulfilled } from 'utils/operations';
import Form from 'components/Form';
import Icon from 'components/Icon';
import useSubmit from 'hooks/useSubmit';
import useAlerts from 'hooks/useAlerts';
import useAuth from 'hooks/useAuth';
import { useAsync } from 'hooks/useBaseAsync';
import MediaButton from './MediaButton';
import styles from './new-story.module.sass';

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

const validationSchema = (isAdmin = false) =>
  object().shape({
    title: string().required('Title is required'),
    slug: isAdmin ? string().required('Slug is required') : undefined,
    description: string(),
    author: string(),
    city: isAdmin ? string().required('City is required') : undefined,
    location: string().required('Location is required'),
    verified: isAdmin ? bool() : undefined,
    eventDate: string().required('The date of this event is required')
  });

const valid = (value) =>
  (moment.isMoment(value) && value.isSameOrBefore(new Date())) ||
  moment(value).isSameOrBefore(new Date());

const dateFormat = 'DD/MM/YYYY';

const NewStory = ({ story }) => {
  const formRef = useRef(null);
  const [state, setState] = useState({});
  const { roles } = useAuth();
  const { showAlert } = useAlerts();
  const initialValues = useMemo(
    () => ({
      title: (story && story.title) || '',
      slug: (story && story.slug) || '',
      description: (story && story.description) || '',
      author: (story && story.author) || '',
      city: (story && story.city) || '',
      location: (story && story.location) || '',
      media: [],
      eventDate: (story && story.eventDate) || '',
      formattedDate: (story && moment(story.eventDate).format(dateFormat)) || ''
    }),
    [story]
  );
  const [{ loading, data: cities }] = useAsync(() => axios.get('/api/cities'), {
    data: []
  });
  const [onSubmit] = useSubmit(
    async (values) => {
      if (story) {
        return axios.put(`/api/stories/${story.id}`, values);
      }

      let media = [];

      if (values.media.length) {
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
        showAlert({
          title: 'Success',
          text: story
            ? 'Story has been updated'
            : 'Your story was successfully created.'
        });
        formRef.current.resetForm();
      },
      onError(err) {
        console.error(err);
        showAlert({
          variant: 'danger',
          text: story
            ? 'A problem occurred during update'
            : 'A problem occurred while creating your story'
        });
      }
    }
  );

  return (
    <Form
      ref={formRef}
      className={styles.root}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema(roles.admin || roles.verifier)}
      onSubmit={onSubmit}>
      {({ values, isSubmitting, setFieldValue }) => (
        <Row>
          <Col xs={12} lg={6}>
            <Form.Control
              name="title"
              label="Title"
              placeholder="A short description"
              onChange={(e) => {
                setFieldValue('title', e.target.value);
                setFieldValue('slug', cleanSlug(e.target.value));
              }}
            />
            {(roles.admin || roles.verifier) && (
              <Form.Control
                name="slug"
                label="Slug"
                placeholder="e.g. a-short-identifier"
                helpText="The url-friendly value for this story's title"
              />
            )}
            <Form.Control
              name="description"
              as="textarea"
              label="Share your story"
              placeholder="Tell us what happened..."
            />
            <Form.Date
              name="formattedDate"
              label="Date"
              format={dateFormat}
              placeholder={dateFormat}
              onChange={(v) => {
                const newValue = v;
                setFieldValue('formattedDate', v);
                if (newValue.constructor.name === 'Moment') {
                  setFieldValue('formattedDate', newValue.format(dateFormat));
                  if (newValue.isValid()) {
                    setFieldValue('eventDate', new Date(v).getTime());
                  }
                }
              }}
              isValidDate={valid}
              helpText="The date when this happened"
            />
            <Form.Control
              name="location"
              label="Location"
              helpText="The place where this happened?"
            />
            {(roles.admin || roles.verifier) && (
              <Form.Control as="select" name="city" label="City">
                {isFulfilled(loading) &&
                  cities.map((city) => (
                    <Form.Control.Option
                      key={city.id}
                      id={city.id}
                      label={city.name}
                    />
                  ))}
              </Form.Control>
            )}
          </Col>
          <Col xs={12} lg={6}>
            <Form.Control
              name="author"
              label="Author"
              placeholder="The name of the author"
              helpText="The author of the media files, if available"
            />
            <MediaButton />
            <FieldArray name="media">
              {({ remove }) => (
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
                      {state[i] !== undefined ? (
                        <div className={styles.progressHolder}>
                          <ProgressBar
                            variant="success"
                            animated={state[i] !== 100}
                            striped={state[i] !== 100}
                            now={state[i] || 0}
                            className={styles.progress}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={styles.mediaClose}
                          onClick={() => remove(i)}>
                          <Icon name="times" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
          </Col>
          <Col xs={12} className={styles.footer}>
            <Form.Group>
              <Form.Button pending={isSubmitting}>
                {story ? 'Update' : 'Share'}
              </Form.Button>
            </Form.Group>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default NewStory;
