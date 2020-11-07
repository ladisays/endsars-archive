import Slider from 'components/Slider';
import { Link } from 'components/Link';
import { buildClassNames } from 'utils/classnames';
import styles from './media.module.sass';

export const MediaSlider = ({ children, ...props }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Slider.Arrow iconCss={styles.arrow} />,
    prevArrow: <Slider.Arrow iconCss={styles.arrow} prev />
  };
  return (
    <Slider {...props} {...settings}>
      {children}
    </Slider>
  );
};

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

const Media = ({
  sources = [],
  className,
  detail = false,
  imageFilter,
  videoFilter
}) => {
  if (!Array.isArray(sources)) {
    return null;
  }
  let filtered = sources;
  const filterType = (type) => (source) => source.type === type;

  if (imageFilter && !videoFilter) {
    filtered = filtered.filter(filterType('image'));
  } else if (videoFilter && !imageFilter) {
    filtered = filtered.filter(filterType('video'));
  }

  if (!filtered.length) {
    return null;
  }

  const classes = buildClassNames(
    className,
    styles.media,
    detail && styles.detail,
    filtered.length > 1 && styles.multi
  );

  return (
    <MediaSlider className={classes}>
      {filtered.map((source) => (
        <MediaItem key={source.id} {...source} />
      ))}
    </MediaSlider>
  );
};

Media.Image = MediaImage;
Media.Video = MediaVideo;

export default Media;
