import Card from 'react-bootstrap/Card';
import './advertisemenet.css';

function Advertisement() {
  return (
    <div className='adv-container' >
    <Card className="bg-dark text-white">
      <Card.Img src="apple-adve.jpg" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className='card-title'>Premium Apple Reseller</Card.Title>
        <Card.Text></Card.Text>
      </Card.ImgOverlay>
    </Card>
    </div>
  );
}

export default Advertisement;