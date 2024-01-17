import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const handleLinkedinHayden = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/hayden-gogan-2570a92a1/");
  };

  return (
    <div id="footer-container">
      <div className="creator-text">Created by Hayden Gogan</div>
      <a
        href="https://github.com/h-moon-g"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github creator-link-icon"></i>
      </a>
      <FontAwesomeIcon
        icon={faLinkedin}
        className="footer-icon"
        onClick={handleLinkedinHayden}
      />
    </div>
  );
}
