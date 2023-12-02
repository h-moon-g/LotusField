import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const handleLinkedinMira = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/miroslawa-borkowska-3b72332a0/");
  };

  const handleLinkedinHayden = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/hayden-gogan-2570a92a1/");
  };

  const handleLinkedinJosh = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/josh-goldenberg-252416a1/");
  };

  const handleLinkedinAlex = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/alexander-heasley-1979732a0/");
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
