import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./mobilePlansStyle.css";

export default function MobilePlans() {
  return (
    <>
    <div className="plans-header">
    <h1>You can choose the conditions that suit you.</h1>
       <h4>
        Do not forget to ask our consultants for more information!
        </h4>
    <br />
    </div>
    <div className="plans-container">
      <div className="plans-card">
        <Card>
          <Card.Img variant="top" src="4g.png" />
          <Card.Body>
            <Card.Title>A-Smart L</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>SMS - 1000</ListGroup.Item>
            <ListGroup.Item>Mobile Data - 5000GB</ListGroup.Item>
            <ListGroup.Item>Roaming - No</ListGroup.Item>
          </ListGroup>
          <Card.Body className="list-group-flush">$19.99/monthly</Card.Body>
        </Card>
      </div>
      <div className="plans-card">
        <Card >
          <Card.Img variant="top" src="4g.png" />
          <Card.Body>
            <Card.Title>A-Smart XL</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>SMS - 5000</ListGroup.Item>
            <ListGroup.Item>Mobile Data - 15 000GB</ListGroup.Item>
            <ListGroup.Item>Roaming - No</ListGroup.Item>
          </ListGroup>
          <Card.Body className="list-group-flush">$30.99/month</Card.Body>
        </Card>
      </div>
      <div className="plans-card">
        <Card >
          <Card.Img variant="top" src="5GG.png" />
          <Card.Body>
            <Card.Title>Unlimited</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>SMS - Unlimited</ListGroup.Item>
            <ListGroup.Item>Mobile Data - Unlimited</ListGroup.Item>
            <ListGroup.Item>Roaming - Unlimited Access</ListGroup.Item>
          </ListGroup>
          <Card.Body className="list-group-flush">$49.99/month</Card.Body>
        </Card>
      </div>
    </div>
    </>
  );
}
