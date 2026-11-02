import { useState } from "react";
import { Mail, Send, CheckCircle, Info } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import { useScrollReveal } from "../hooks/useScrollReveal";
import emailjs from "@emailjs/browser";

const CONTACT_ITEMS = [
  {
    icon: <Mail size={17} />,
    label: "Email",
    value: "adrianusalbertdacostacharlovel@gmail.com",
    href: "mailto:adrianusalbertdacostacharlovel@gmail.com",
  },
  {
    icon: <GithubIcon size={17} />,
    label: "GitHub",
    value: "github.com/charlovelysun",
    href: "https://github.com/charlovelysun",
  },
];

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!form.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!form.message.trim()) {
    errors.message = "Message cannot be empty.";
  } else if (form.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }

  return errors;
}

export default function Contact() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal({ threshold: 0.1 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSendError(
        "Email configuration is incomplete. Please check your environment variables.",
      );
      return;
    }

    setIsSending(true);
    setSendError("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: form.name,
          user_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        {
          publicKey: publicKey,
        },
      );

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);

      setSendError(
        `EmailJS Error: ${error?.text || error?.message || "Unknown error"}`,
      );
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-inner">
          {/* Left */}
          <div ref={leftRef} className="reveal">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Let's Connect</h2>

            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 12,
              }}
            >
              Have an Idea? Let's Build Something.
            </p>

            <p className="section-subtitle" style={{ marginBottom: 28 }}>
              Saya terbuka untuk belajar bersama, berdiskusi tentang project,
              dan berkolaborasi dalam pengembangan website. Jika ada hal menarik
              yang ingin dibicarakan, silakan hubungi saya.
            </p>

            <div className="contact-info-list">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-info-item"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <div className="contact-info-icon">{item.icon}</div>

                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="reveal-right">
            {submitted ? (
              <div className="contact-success">
                <div className="success-icon">
                  <CheckCircle size={28} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                  }}
                >
                  Message Sent Successfully!
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Terima kasih sudah menghubungi saya. Pesan kamu berhasil
                  dikirim. Saya akan menghubungi kamu melalui email.
                </p>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setSendError("");
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Full Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`form-input${errors.name ? " error" : ""}`}
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />

                    {errors.name && (
                      <span className="form-error">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input${errors.email ? " error" : ""}`}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />

                    {errors.email && (
                      <span className="form-error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">
                    Subject *
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className={`form-input${errors.subject ? " error" : ""}`}
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                  />

                  {errors.subject && (
                    <span className="form-error">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    className={`form-textarea${errors.message ? " error" : ""}`}
                    placeholder="Tell me what you have in mind..."
                    value={form.message}
                    onChange={handleChange}
                  />

                  {errors.message && (
                    <span className="form-error">{errors.message}</span>
                  )}
                </div>

                <p className="form-note">
                  <Info size={13} />
                  Your message will be sent directly to my email.
                </p>

                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    background: "var(--accent-primary)",
                    color: "#0b0d12",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                >
                  {isSending ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </button>

                {sendError && (
                  <p className="form-status-error" role="alert">
                    {sendError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
