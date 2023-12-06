import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Iframe from "react-iframe";
import './AboutUs.css'

const AboutUsPage = () => {
  return (
    <div className="main">
      <div className="hero-section">
        <Container>
          <h1 className="display-4">Discover the Future of Smart Living</h1>
          <p className="lead">
            We are passionate about leveraging cutting-edge technologies to
            redefine the way we live and interact with smart devices.
          </p>
        </Container>
      </div>
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <h2>Who We Are</h2>
            <p>
              Welcome to our world of innovation! At A-Mobile, we are
              driven by a deep commitment to explore the possibilities of smart
              devices and technologies. Our team of experts is dedicated to
              creating a seamless and connected future.
            </p>
            <h2>Milestones</h2>
            <ul>
              <li>Established in 2003 year</li>
              <li>Launched our first smart device in 2007 year</li>
              <li>Reached 100,000 satisfied customers in 2011 year</li>
              <li>20 years on the global market</li>
            </ul>
          </Col>
          <Col md={6}>
            <div
              style={{
                height: "300px",
                width: "100%",
                marginBottom: "20px", 
              }}
            >
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2074.0245041438484!2d23.3084310810437!3d42.680136291558775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa851c5b01a4d5%3A0x132ea4f594a00ae1!2sul.%20%22Balsha%22%2025%2C%201408%20Ivan%20Vazov%2C%20Sofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1701866537710!5m2!1sen!2sus"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="py-4">
        <Row>
          <Col>
            <h2>Contacts</h2>
            <p> Phones: +359 888 888 888 +359 999 999 999  </p>
            <p> Email: contact@a-mobile.com </p>
            <p> Address: Sofia, Ivan Vazov, ul. Balsha 25</p>
          </Col>
          <Col>
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower individuals and businesses through
              innovative smart solutions. We strive to create products that
              enhance efficiency, connectivity, and overall quality of life.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AboutUsPage;