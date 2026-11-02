// About.jsx
import {} from "react";
import { BookOpen, Code2, Layers, Lightbulb } from "lucide-react";
import { useScrollReveal, useScrollRevealList } from "../hooks/useScrollReveal";

const STATS = [
  {
    icon: <BookOpen size={18} />,
    value: "3+ Years",
    label: "Learning Web Development",
  },
  {
    icon: <Code2 size={18} />,
    value: "Self-Taught",
    label: "Independent Developer",
  },
  {
    icon: <Layers size={18} />,
    value: "5+",
    label: "Projects Built",
  },
  {
    icon: <Lightbulb size={18} />,
    value: "Always",
    label: "Exploring New Technologies",
  },
];

const TERMINAL_LINES = [
  { type: "cmd", prompt: "~", text: "whoami" },
  { type: "out", text: "charlovely — junior web developer" },
  { type: "cmd", prompt: "~", text: "cat journey.txt" },
  { type: "out-accent", text: "HTML → CSS → JS → PHP" },
  { type: "out-accent", text: "Node.js → Laravel → React.js" },
  { type: "cmd", prompt: "~", text: "echo $STATUS" },
  { type: "out-info", text: "Learning. Building. Growing." },
  { type: "cmd", prompt: "~", text: "ls skills/" },
  { type: "comment", text: "# frontend, backend, databases, tools" },
];

export default function About() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal({ threshold: 0.1 });
  const statRefs = useScrollRevealList(STATS.length, { stagger: 120 });

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-inner">
          {/* Left: text */}
          <div ref={leftRef} className="reveal">
            <div className="about-header">
              <p className="section-label">About Me</p>
              <h2 className="section-title">A Little About Me</h2>
              <p className="section-subtitle">
                Not just writing code, but learning how things work.
              </p>
            </div>

            <div className="about-body">
              <p>
                Perjalanan saya di dunia web development dimulai dari{" "}
                <span className="about-highlight">rasa penasaran</span> tentang bagaimana
                sebuah website dibuat dan bagaimana kode bisa menghasilkan sesuatu yang
                bisa digunakan orang lain.
              </p>
              <p>
                Selama kurang lebih{" "}
                <span className="about-highlight">3 tahun</span>, saya belajar secara
                otodidak dengan mencoba berbagai teknologi, mengikuti dokumentasi,
                membaca kode, dan membangun project sendiri.
              </p>
              <p>
                Awalnya mempelajari HTML, CSS, dan JavaScript untuk memahami cara kerja
                website. Setelah semakin terbiasa, mulai mengeksplorasi backend
                menggunakan PHP dan Node.js, kemudian mempelajari{" "}
                <span className="about-highlight">Laravel dan React.js</span> untuk
                membangun aplikasi yang lebih terstruktur.
              </p>
              <p>
                Dalam prosesnya, saya juga belajar mengenai MySQL, REST API, CRUD,
                debugging, Git, dan bagaimana frontend berkomunikasi dengan backend.
              </p>
              <p>
                Saat ini saya masih duduk di{" "}
                <span className="about-highlight">kelas 11</span> dan perjalanan belajar
                ini masih panjang. Bagi saya, setiap project bukan hanya tentang
                menghasilkan website — tetapi juga tentang memahami masalah, mencoba
                solusi, dan belajar dari kesalahan.
              </p>
            </div>
          </div>

          {/* Right: stats + terminal */}
          <div ref={rightRef} className="reveal-right">
            <div className="about-stats">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  ref={statRefs(i)}
                  className="about-stat reveal"
                >
                  <div className="about-stat-icon">{stat.icon}</div>
                  <div className="about-stat-value">{stat.value}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div className="about-terminal">
              <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">terminal — charlovely</span>
              </div>
              <div className="terminal-body">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} className="term-line">
                    {line.type === "cmd" && (
                      <>
                        <span className="term-prompt">{line.prompt} $</span>
                        <span className="term-command">{line.text}</span>
                      </>
                    )}
                    {line.type === "out" && (
                      <span className="term-output">{line.text}</span>
                    )}
                    {line.type === "out-accent" && (
                      <span className="term-success" style={{ marginLeft: 20 }}>{line.text}</span>
                    )}
                    {line.type === "out-info" && (
                      <span className="term-info" style={{ marginLeft: 20 }}>{line.text}</span>
                    )}
                    {line.type === "comment" && (
                      <span className="term-comment" style={{ marginLeft: 20 }}>{line.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
