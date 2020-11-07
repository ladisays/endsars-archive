import React from 'react';

import Icon from 'components/Icon';

export const Toggle = ({ onClick, className, children, ...props }, ref) => (
  <button
    data-custom-toggle
    type="button"
    ref={ref}
    onClick={onClick}
    {...props}>
    {children}
    <Icon name="ellipsis-h" />
  </button>
);

export default React.forwardRef(Toggle);
