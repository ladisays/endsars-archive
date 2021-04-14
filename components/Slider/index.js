import SlickSlider from 'react-slick';

import useMounted from 'hooks/useMounted';
import Arrow from './Arrow';

const Slider = ({ children, innerRef, breakpoints = null, ...props }) => {
  const isMounted = useMounted();

  const settings = {
    ...props,
    responsive: isMounted ? breakpoints : null
  };

  return (
    <SlickSlider
      ref={innerRef}
      key={isMounted ? 'client' : 'server'}
      {...settings}>
      {children}
    </SlickSlider>
  );
};

Slider.Arrow = Arrow;

export default Slider;
