import { useField } from 'formik';

import Icon from 'components/Icon';
import styles from './media-button.module.sass';

const readFile = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ file, src: reader.result });
    };
    reader.readAsDataURL(file);
  });

const getSources = async (files) =>
  Promise.all(Array.from(files).map(readFile));

const MediaButton = ({ name = 'media' }) => {
  const [{ value, ...media }, , helpers] = useField(name);
  const handleMediaChange = async (event) => {
    const sources = await getSources(event.target.files);
    console.log(sources);
    const newValue = [...value, ...sources];
    if (newValue.length > 4) {
      helpers.setError('You can only select up to 4 files');
    } else {
      helpers.setValue(newValue);
    }
  };

  return (
    <div className={styles.media}>
      <input
        accept="image/*, video/*"
        type="file"
        multiple
        {...media}
        onChange={handleMediaChange}
      />
      <Icon name="photo-video" size="lg" />
    </div>
  );
};

export default MediaButton;
