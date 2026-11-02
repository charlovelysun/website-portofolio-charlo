// Projects.jsx
import { useState, useCallback, useEffect } from "react";
import { GithubIcon } from "../components/SocialIcons";
import {
  ExternalLink,
  X,
  Layers,
  Monitor,
  Code2,
  Database,
  Globe,
} from "lucide-react";
import { projects, projectCategories } from "../data/projects";
import { useScrollReveal, useScrollRevealList } from "../hooks/useScrollReveal";

// Map category to icon
function getCategoryIcon(slug) {
  switch (slug) {
    case "fullstack":
      return <Database size={20} />;
    case "frontend":
      return <Monitor size={20} />;
    default:
      return <Code2 size={20} />;
  }
}

function getStatusClass(status) {
  if (status === "Completed") return "completed";
  if (status === "In Development") return "in-development";
  return "concept";
}

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

// Project thumbnail placeholder
function ProjectThumbnail({ project }) {
  return (
    <div className="project-thumbnail">
      <div
        className="project-thumb-placeholder"
        style={{
          background: `linear-gradient(135deg, rgba(${hexToRgb(project.color)},0.06) 0%, transparent 60%)`,
        }}
      >
        <div className="thumb-bg-pattern" />
        <div className="thumb-number">{project.number}</div>
        <div
          className="thumb-icon"
          style={{
            color: project.color,
            borderColor: `rgba(${hexToRgb(project.color)},0.2)`,
          }}
        >
          {getCategoryIcon(project.categorySlug)}
        </div>
      </div>
      <div className="project-hover-overlay">
        <span className="view-project-btn">
          View Details
          <ExternalLink size={14} />
        </span>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 245, 160";
}

// Modal
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <StatusBadge status={project.status} />
              <span className="tech-tag">{project.category}</span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              {project.title}
            </h3>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Description */}
          <div>
            <p className="modal-section-title">About this project</p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              {project.longDescription}
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <p className="modal-section-title">Tech Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="modal-section-title">Key Features</p>
            <div className="modal-features">
              {project.features.map((f) => (
                <div key={f} className="modal-feature-item">
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={15} />
                View on GitHub
              </a>
            ) : (
              <span
                className="btn btn-outline project-action-btn disabled"
                title="GitHub link not yet available"
              >
                <GithubIcon size={15} />
                GitHub (soon)
              </span>
            )}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            ) : null}
          </div>

          {!project.githubUrl && !project.liveUrl && (
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                fontStyle: "italic",
              }}
            >
              Links will be added when available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Featured project card (large)
function FeaturedProjectCard({ project, onClick, cardRef }) {
  return (
    <article
      ref={cardRef}
      className="project-card-featured reveal"
      onClick={() => onClick(project)}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title} details`}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
    >
      <ProjectThumbnail project={project} />
      <div className="project-info">
        <div className="project-meta">
          <span className="project-number">{project.number}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tech-row">
          {project.techStack.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
        <div className="project-actions">
          <span
            className={`project-action-btn github${!project.githubUrl ? " disabled" : ""}`}
          >
            <GithubIcon size={13} />
            {project.githubUrl ? "GitHub" : "GitHub (soon)"}
          </span>
          {project.liveUrl && (
            <span className="project-action-btn live">
              <ExternalLink size={13} />
              Live Demo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// Regular project card (small)
function RegularProjectCard({ project, onClick, cardRef }) {
  return (
    <article
      ref={cardRef}
      className="project-card reveal"
      onClick={() => onClick(project)}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title} details`}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
    >
      <div className="project-card-header">
        <div
          className="project-card-icon"
          style={{
            background: `rgba(${hexToRgb(project.color)},0.08)`,
            color: project.color,
          }}
        >
          {getCategoryIcon(project.categorySlug)}
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-desc">{project.description}</p>

      <div className="project-card-tech">
        {project.techStack.map((t) => (
          <span key={t} className="tech-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="project-card-actions">
        <span
          className={`project-action-btn github${!project.githubUrl ? " disabled" : ""}`}
          style={{ fontSize: "0.75rem" }}
        >
          <GithubIcon size={12} />
          {project.githubUrl ? "GitHub" : "GitHub (soon)"}
        </span>
        {project.liveUrl && (
          <span
            className="project-action-btn live"
            style={{ fontSize: "0.75rem" }}
          >
            <ExternalLink size={12} />
            Demo
          </span>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const headerRef = useScrollReveal();

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.categorySlug === activeFilter,
  );

  const featuredFiltered = filteredProjects.filter((p) => p.featured);
  const regularFiltered = filteredProjects.filter((p) => !p.featured);

  const setProjectRef = useScrollRevealList(filteredProjects.length, {
    stagger: 100,
  });

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject, closeModal]);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="projects-header reveal">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Some Things I've Built</h2>
          <p className="section-subtitle">
            Projects are where I learn, experiment, and turn ideas into
            something real.
          </p>
        </div>

        {/* Filter */}
<div
  className="projects-filter"
  role="tablist"
  aria-label="Project category filter"
>
  {projectCategories.map((cat) => (
    <button
      key={cat.value}
      role="tab"
      aria-selected={activeFilter === cat.value}
      className={`filter-btn${
        activeFilter === cat.value ? " active" : ""
      }`}
      onClick={() => setActiveFilter(cat.value)}
    >
      {cat.label}
    </button>
  ))}
</div>

{/* Featured Projects */}
{featuredFiltered.length > 0 && (
  <div className="projects-featured">
    {featuredFiltered.map((project, index) => (
      <FeaturedProjectCard
        key={project.id}
        project={project}
        onClick={openModal}
        cardRef={setProjectRef(index)}
      />
    ))}
  </div>
)}

{/* Regular Projects */}
{regularFiltered.length > 0 && (
  <div className="projects-grid">
    {regularFiltered.map((project, index) => (
      <RegularProjectCard
        key={project.id}
        project={project}
        onClick={openModal}
        cardRef={setProjectRef(featuredFiltered.length + index)}
      />
    ))}
  </div>
)}

{/* Empty State */}
{filteredProjects.length === 0 && (
  <div
    style={{
      textAlign: "center",
      padding: "48px 0",
      color: "var(--text-muted)",
    }}
  >
    No projects in this category yet.
  </div>
)}
   </div> 
      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
}