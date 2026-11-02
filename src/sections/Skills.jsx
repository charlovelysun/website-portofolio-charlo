// Skills.jsx
import { useEffect, useRef, useState } from "react";
import { Monitor, Server, Wrench } from "lucide-react";
import { skillCategories, techBadges } from "../data/skills";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ICON_MAP = {
  Monitor: <Monitor size={18} />,
  Server: <Server size={18} />,
  Wrench: <Wrench size={18} />,
};

function SkillBar({ level, animate }) {
  return (
    <div className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{ width: animate ? `${level}%` : "0%" }}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

function SkillCategoryCard({ category, index }) {
  const [animate, setAnimate] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setAnimate(true);
      return;
    }

    let timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeout = setTimeout(() => {
              setAnimate(true);
            }, index * 150);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="skill-category-card "
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="skill-category-header">
        <div className="skill-category-icon">{ICON_MAP[category.icon]}</div>

        <h3 className="skill-category-title">{category.title}</h3>
      </div>

      <div className="skill-list">
        {category.skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headerRef = useScrollReveal();

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div ref={headerRef} className="skills-header reveal">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">
            A collection of tools and languages I've picked up along the way —
            each one learned through building actual projects.
          </p>
          <p className="skills-note">
            * Persentase adalah estimasi subjektif tingkat kenyamanan &amp;
            pengalaman praktis, bukan ukuran kemampuan profesional.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, i) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              index={i}
            />
          ))}
        </div>

        {/* Tech badge cloud */}
        <div className="skills-tech-row" aria-label="Technology tags">
          {techBadges.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
