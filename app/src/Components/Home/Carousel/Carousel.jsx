import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CarouselItem() {
  return (
    <div className="carousel-container">
      <div className="carousel-container-text">
        <h1 className="carousel-container-text-header">BLACK FRIDAY</h1>
        <p className="carousel-container-text-p">UP TO</p>
        <p className="carousel-container-text-p-percent">-70%</p>
        <p className="carousel-container-text-p">OFF!</p>
      </div>
        <Carousel fade>
          <Carousel.Item interval={3000}>
            <img
              className="carousel-img"
              text="First slide"
              src="office.jpg"
            />
            <Carousel.Caption>
              <h1 className="fade-in">Why to choice us?</h1>
              <p className="fade-in">
                Inovative solutions. Empower your mobile experience with our
                cutting-edge services.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="carousel-img"
              text="Second slide"
              src="work-2.png"
            />
            <Carousel.Caption>
              <h1 className="fade-in">Why we are better?</h1>
              <p className="fade-in">
                24/7 customer support. Reaction in just 2 hours!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="carousel-img"
              text="4 slide"
              src="work-3.png"
            />
            <Carousel.Caption>
              <h1 className="fade-in">Excellent network coverage!</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
  );
}

export default CarouselItem;
