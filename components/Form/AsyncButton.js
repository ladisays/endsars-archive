import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const AsyncButton = ({
  pending,
  invalid,
  children,
  type = 'submit',
  ...rest
}) => (
  <Button disabled={invalid || pending} type={type} {...rest}>
    {pending && <Spinner animation="border" className="mr-2" size="sm" />}
    <span>{children}</span>
  </Button>
);

export default AsyncButton;
