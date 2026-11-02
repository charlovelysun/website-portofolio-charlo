// Journey.jsx
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const STAGES = [
  {
    id: "01",
    title: "Web Fundamentals",
    description:
      "Mulai mempelajari HTML dan CSS — bagaimana sebuah halaman web terbentuk, cara mengatur layout, dan bagaimana styling bekerja. Ini adalah titik awal dari semuanya.",
    tags: ["HTML5", "CSS3", "Flexbox", "Responsive Design"],
    icon: "🧱",
  },
  {
    id: "02",
    title: "JavaScript Exploration",
    description:
      "Mulai memahami JavaScript: DOM manipulation, event handling, kondisi, perulangan, dan logika pemrograman dasar. JavaScript membuka cara berpikir baru tentang interaktivitas.",
    tags: ["JavaScript", "DOM", "Event Handling", "ES6+"],
    icon: "⚡",
  },
  {
    id: "03",
    title: "Backend Development",
    description:
      "Mengeksplorasi PHP dan Node.js untuk membangun sisi server. Mulai memahami database MySQL, operasi CRUD, serta bagaimana frontend dan backend berkomunikasi melalui API.",
    tags: ["PHP", "Node.js", "MySQL", "REST API", "CRUD"],
    icon: "⚙️",
  },
  {
    id: "04",
    title: "Modern Web Development",
    description:
      "Mulai menggunakan Laravel untuk backend yang lebih terstruktur dan React.js untuk membangun UI yang dinamis. Sebuah lompatan besar dalam cara membangun aplikasi web.",
    tags: ["Laravel", "React.js", "Component-Based", "Full-Stack"],
    icon: "🚀",
  },
];

export default function Journey() {
  const headerRef = useScrollReveal();
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Staggered item reveal
    const itemObservers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.classList.add("revealed");
              }, i * 180);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      return observer;
    });

    // Line fill animation
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = rect.top + window.scrollY - windowH * 0.6;
      const end = rect.bottom + window.scrollY - windowH * 0.4;
      const scrolled = window.scrollY;
      const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)));
      setFillHeight(prefersReduced ? 100 : progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      itemObservers.forEach((obs) => obs && obs.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="section journey" id="journey">
      <div className="container">
        <div ref={headerRef} className="journey-header reveal">
          <p className="section-label">Journey</p>
          <h2 className="section-title">How I Got Here</h2>
          <p className="section-subtitle">
            Three years of learning, experimenting, and building. Not always in order, not always smooth — but always moving forward.
          </p>
        </div>

        <div className="journey-timeline" ref={timelineRef}>
          {/* Animated vertical line */}
          <div className="timeline-line" aria-hidden="true">
            <div
              className="timeline-line-fill"
              style={{ height: `${fillHeight}%` }}
            />
          </div>

          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              ref={(el) => (itemRefs.current[i] = el)}
              className="timeline-item"
            >
              <div className="timeline-dot" aria-hidden="true">
                <div className="timeline-dot-inner" />
              </div>

              <div className="timeline-content">
                <div className="timeline-stage">Stage {stage.id}</div>
                <h3 className="timeline-title">
                  <span style={{ marginRight: 8 }}>{stage.icon}</span>
                  {stage.title}
                </h3>
                <p className="timeline-desc">{stage.description}</p>
                <div className="timeline-tags">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
