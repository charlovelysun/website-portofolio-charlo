// Footer.jsx
import { Mail } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            Charlovely<span>.dev</span>
          </div>

          <p className="footer-copy">
            Designed &amp; built by <span>Charlovely Adrianus Albert Dacosta</span> · {year}
          </p>

          <div className="footer-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href="mailto:your@email.com"
              className="footer-link"
              aria-label="Email"
              title="Email"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
