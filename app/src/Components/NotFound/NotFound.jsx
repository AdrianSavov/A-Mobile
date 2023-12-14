import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="heading">404</h1>
      <p className="text">Not Found</p>
      <p className="text">The page you are looking for might be in another universe.</p>
      <Link to="/" className="link">Go Home</Link>
    </div>
  );
};

export default NotFound;
