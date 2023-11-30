import Card from "react-bootstrap/Card";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css";

function HeaderAndFooterExample() {
  return (
      <div className="footer-container">
        <div className="footer-header">More Information</div>
        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
        <Card.Body className="footer-card-body">
          <Card.Title>All Rights Reserved &copy;</Card.Title>
          <Card.Text>
            This is a project to defence developed by A.Savov - SoftUni student.
          </Card.Text>
        </Card.Body>
      </div>
  );
}

export default HeaderAndFooterExample;
