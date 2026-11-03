// Certificates.jsx
import { Award, Calendar, Building2, Cloud, ExternalLink, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { CERTIFICATES } from "../data/certificates";

export default function Certificates() {
  const headerRef = useScrollReveal();
  const listRef = useScrollReveal();

  return (
    <section className="section certificates" id="certificates">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="reveal certificates-header">
          <p className="section-label">Certifications &amp; Awards</p>
          <h2 className="section-title">Honors &amp; Achievements</h2>
          <p className="section-subtitle">
            Penghargaan resmi dan pencapaian kompetensi dalam bidang teknologi dan komputasi awan.
          </p>
        </div>

        {/* Certificate Cards */}
        <div ref={listRef} className="reveal certificates-grid">
          {CERTIFICATES.map((cert) => (
            <article key={cert.id} className="certificate-card">
              {/* Card Banner / Header */}
              <div className="certificate-card-top">
                <div className="certificate-badge">
                  <Award size={16} />
                  <span>{cert.level}</span>
                </div>

                <div className="certificate-year">{cert.year}</div>
              </div>

              {/* Title & Category */}
              <div className="certificate-main">
                <div className="certificate-icon-wrapper">
                  <Cloud size={24} />
                </div>

                <div>
                  <div className="certificate-category">{cert.category}</div>
                  <h3 className="certificate-title">{cert.title}</h3>
                </div>
              </div>

              {/* Metadata Info */}
              <div className="certificate-meta">
                <div className="certificate-meta-item">
                  <Building2 size={15} />
                  <span>{cert.issuer} ({cert.school})</span>
                </div>
                <div className="certificate-meta-item">
                  <Calendar size={15} />
                  <span>{cert.date}</span>
                </div>
                <div className="certificate-meta-item">
                  <ShieldCheck size={15} />
                  <span>No: {cert.credentialNo}</span>
                </div>
              </div>

              {/* Highlights */}
              {cert.highlights && (
                <ul className="certificate-highlights">
                  {cert.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Tags */}
              <div className="certificate-tags">
                {cert.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              {cert.pdfUrl && (
                <div className="certificate-action">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline certificate-btn"
                  >
                    <span>Lihat Piagam Asli (PDF)</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
