// Basic requirement to load a fontawesome icon is as follows.

// Look here - http://fontawesome.io/cheatsheet/ - for any icon choice,
// then, pass the icon name as a "name" prop.
// e.g. if the icon name is "close", then you just do this <Icon name="close" />

// To choose an icon style, pass the "iconStyle" prop with either of these values:
// For solid icons, use "fas";
// For regular icons, use "far";
// For brand icons, use "fab";
// e.g. <Icon name="spinner" iconStyle="fas" />

// To use the spin functionality, pass the "shouldSpin" prop, i.e. <Icon name="spinner" shouldSpin />
// Spin works well with "spinner", "cog", "circle-notch", "sync";

// To add a border to an icon, pass the "hasBorder" prop, i.e. <Icon name="close" hasBorder />

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({
  name,
  size = '1x',
  iconStyle = 'fas',
  iconCss,
  shouldSpin,
  hasBorder,
  hasInverse,
  flip,
  rotate,
  ...rest
}) =>
  !!name && (
    <FontAwesomeIcon
      icon={[iconStyle, name]}
      size={size}
      className={iconCss}
      spin={shouldSpin}
      border={hasBorder}
      inverse={hasInverse}
      flip={flip}
      rotate={rotate}
      {...rest}
    />
  );

export default Icon;
