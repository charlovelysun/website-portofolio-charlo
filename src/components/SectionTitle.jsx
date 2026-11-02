// SectionTitle.jsx
export default function SectionTitle({ label, title, subtitle, center }) {
  return (
    <div className={`section-header-block${center ? " center" : ""}`}>
      {label && (
        <p className="section-label" style={center ? { justifyContent: "center" } : {}}>
          {label}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-subtitle" style={center ? { maxWidth: "540px", margin: "0 auto" } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
