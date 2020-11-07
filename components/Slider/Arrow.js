import Icon from 'components/Icon';
import styles from './arrow.module.sass';

const Arrow = ({
  onClick,
  iconName = '',
  iconCss = '',
  prev = false,
  infinite,
  currentSlide,
  slideCount
}) => {
  const disabled = prev ? currentSlide === 0 : slideCount - 1 === currentSlide;
  const classes =
    iconCss || `${styles.arrow} ${prev ? styles.left : styles.right}`;
  const icon = iconName || (prev ? 'arrow-left' : 'arrow-right');

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      disabled={!infinite && disabled}>
      <Icon name={icon} />
    </button>
  );
};

export default Arrow;
