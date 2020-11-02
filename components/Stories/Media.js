import { Link } from 'components/Link';
import styles from './media.module.sass';

export const MediaImageLink = ({ children }) => (
  <Link href="/stories/[id]/image/[position]">{children}</Link>
);
export const MediaImage = ({ src }) => <img src={src} alt="" />;
export const MediaVideo = ({ src, mimetype }) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video controls playsInline preload="auto">
      <source src={src} type={mimetype} />
    </video>
  );
};

export const MediaItem = ({ type, className, ...source }) => (
  <div data-media-item={type} className={className || styles.item}>
    {type === 'video' ? <MediaVideo {...source} /> : <MediaImage {...source} />}
  </div>
);

const Media = ({ sources = [], className }) => {
  if (!Array.isArray(sources) || !sources.length) {
    return null;
  }

  return (
    <div className={className || styles.media}>
      {sources.map((source) => (
        <MediaItem key={source.id} {...source} />
      ))}
    </div>
  );
};

Media.Image = MediaImage;
Media.Video = MediaVideo;

export default Media;
