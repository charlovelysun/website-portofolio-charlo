// Hero.jsx
import { useEffect, useState, useRef } from "react";
import { Mail, User, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import "../styles/hero.css";
import profileImage from "../assets/profile.jpg";

const TYPING_ROLES = [
  "Junior Web Developer",
  "Frontend Developer",
  "Backend Explorer",
  "Self-Taught Developer",
];

function useTypingEffect(words, speed = 80, eraseSpeed = 45, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [erasing, setErasing] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!erasing && charIndex < currentWord.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (!erasing && charIndex === currentWord.length) {
      timeoutRef.current = setTimeout(() => setErasing(true), pauseMs);
    } else if (erasing && charIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, eraseSpeed);
    } else if (erasing && charIndex === 0) {
      setErasing(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, erasing, wordIndex, words, speed, eraseSpeed, pauseMs]);

  return displayed;
}

export default function Hero() {
  const typedRole = useTypingEffect(TYPING_ROLES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="home" aria-label="Hero section">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
      </div>

      <div
        className="hero-inner"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Left content */}
        <div className="hero-content">
          {/* Availability badge */}
          <div className="hero-status" role="status">
            <span className="status-indicator" aria-hidden="true" />
            Available for Learning &amp; Collaboration
          </div>

          {/* Greeting */}
          <p className="hero-greeting">
            <span className="hero-wave" aria-hidden="true">
              👋
            </span>
            <span>Hi, I'm</span>
          </p>

          {/* Name */}
          <h1 className="hero-name">Charlovely Adrianus Albert Dacosta.</h1>

          {/* Typing role */}
          <div
            className="hero-typing-wrapper"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="typing-text">{typedRole}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h2 className="hero-headline">
            Building the Web,{" "}
            <span className="gradient-text">One Project at a Time.</span>
          </h2>

          {/* Description */}
          <p className="hero-description">
            An 11th-grade student and self-taught web developer with around 3
            years of experience exploring technologies and building things for
            the web. Dari HTML sederhana sampai Laravel dan React — semuanya
            dimulai dari rasa penasaran dan keinginan untuk terus belajar.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={scrollToProjects}>
              Explore My Projects
              <ExternalLink size={15} />
            </button>
            <button className="btn btn-outline" onClick={scrollToContact}>
              Get In Touch
            </button>
          </div>

          {/* Social links */}
          <div className="hero-social">
            <span className="hero-social-label">Find me on</span>
            <a
              href="https://github.com/charlovelysun"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="mailto:adrianusalbertdacostacharlovel@gmail.com"
              className="social-link"
              aria-label="Email me"
              title="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Right — Avatar + Code card */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-avatar-wrapper">
            <div className="hero-avatar-ring" />
            <div className="hero-avatar">
              <img src={profileImage} alt="Foto profil Charlovely" />
            </div>
          </div>

          {/* Code snippet card */}
          <div className="hero-code-card">
            <div className="code-line">
              <span className="code-num">1</span>
              <span className="code-keyword">const</span>
              <span className="code-var"> developer </span>
              <span style={{ color: "#79c0ff" }}>=</span>
              <span style={{ color: "#ff7b72" }}> &#123;</span>
            </div>
            <div className="code-line">
              <span className="code-num">2</span>
              <span style={{ marginLeft: 12 }} className="code-string">
                "name"
              </span>
              <span style={{ color: "#ff7b72" }}>:</span>
              <span className="code-accent"> "Charlovely"</span>
              <span style={{ color: "#ff7b72" }}>,</span>
            </div>
            <div className="code-line">
              <span className="code-num">3</span>
              <span style={{ marginLeft: 12 }} className="code-string">
                "role"
              </span>
              <span style={{ color: "#ff7b72" }}>:</span>
              <span className="code-accent"> "junior dev"</span>
              <span style={{ color: "#ff7b72" }}>,</span>
            </div>
            <div className="code-line">
              <span className="code-num">4</span>
              <span style={{ marginLeft: 12 }} className="code-string">
                "learning"
              </span>
              <span style={{ color: "#ff7b72" }}>:</span>
              <span style={{ color: "#79c0ff" }}> true</span>
              <span style={{ color: "#ff7b72" }}>,</span>
            </div>
            <div className="code-line">
              <span className="code-num">5</span>
              <span style={{ marginLeft: 12 }} className="code-fn">
                open
              </span>
              <span style={{ color: "#ff7b72" }}>: (</span>
              <span className="code-var">ideas</span>
              <span style={{ color: "#ff7b72" }}>) =&gt; </span>
              <span className="code-accent">true</span>
            </div>
            <div className="code-line">
              <span className="code-num">6</span>
              <span style={{ color: "#ff7b72" }}>&#125;</span>
            </div>
            <div className="code-line">
              <span className="code-num">7</span>
              <span className="code-comment">// always building...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero-scroll-indicator"
        onClick={scrollToAbout}
        aria-label="Scroll down"
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-label">scroll</span>
      </button>
    </section>
  );
}
