import Card from 'react-bootstrap/Card';

const Story = ({ text }) => {
  return (
    <Card className="mb-4">
      <Card.Body>{text}</Card.Body>
    </Card>
  );
};

export default Story;
