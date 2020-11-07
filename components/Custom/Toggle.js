import React from 'react';

export const Toggle = ({ onClick, children }, ref) => (
  <button data-custom-toggle type="button" ref={ref} onClick={onClick}>
    {children}
  </button>
);

export default React.forwardRef(Toggle);
