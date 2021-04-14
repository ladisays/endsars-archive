import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ variant }) => (
  <div className="d-flex justify-content-center align-items-center w-100 mt-3">
    <Spinner variant={variant} animation="border" />
  </div>
);

export default Loading;
