import { useField } from 'formik';

import { generateId } from 'utils/slugs';
import Icon from 'components/Icon';
import useAlerts from 'hooks/useAlerts';
import styles from './media-button.module.sass';

const getType = (file) => {
  if (!file) return '';

  let type;
  if (file.type.startsWith('image/')) {
    type = 'image';
  } else if (file.type.startsWith('video/')) {
    type = 'video';
  }
  return type;
};

const readFile = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        id: generateId(),
        file,
        src: reader.result,
        type: getType(file),
        progress: 0,
        new: true
      });
    };
    reader.readAsDataURL(file);
  });

const getSources = (files) => Promise.all(Array.from(files).map(readFile));

const MediaButton = ({ name = 'media' }) => {
  const { showAlert } = useAlerts();
  const [{ value, ...media }, , helpers] = useField(name);
  const handleMediaChange = async (event) => {
    const sources = await getSources(event.target.files);
    const newValue = [...value, ...sources];
    if (newValue.length > 10) {
      const text = 'You can only select up to 10 files';
      helpers.setError(text);
      showAlert({ text, variant: 'danger' });
    } else {
      helpers.setValue(newValue);
    }
  };

  return (
    <div className={styles.media}>
      <div className={styles.mediaBox}>
        <Icon name="photo-video" size="lg" />
        <div>Click to select media files</div>
      </div>
      <input
        accept="image/*, video/*"
        type="file"
        multiple
        {...media}
        onChange={handleMediaChange}
      />
    </div>
  );
};

export default MediaButton;
