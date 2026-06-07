'use client';

import styles from './ExperienceSection.module.css';

const EXPERIENCE = [
  {
    role: 'Full Stack Design & Development Intern',
    company: 'Wingcruit Consulting Service',
    period: 'Feb 2026 – May 2026',
    type: 'Internship',
    bullets: [
      'Developed responsive, production-ready web applications using the MERN stack.',
      'Improved application performance through code splitting and component optimization.',
      'Designed UI/UX workflows using Figma for seamless user experiences.',
      'Developed RESTful APIs for efficient data management and communication.',
      'Optimized MongoDB schemas and queries for scalability at scale.',
      'Collaborated within Agile Scrum teams and contributed to sprint planning and code reviews.',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Work Experience</p>
          <h2 className="section-title">
            Where I've <span className="gradient-text">Worked</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.timelineLeft}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineLine} />
              </div>
              <div className={`glass-card ${styles.card}`}>
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.typeBadge}>{exp.type}</span>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <div className={styles.period}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    {exp.period}
                  </div>
                </div>
                <ul className={styles.bullets}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className={styles.bullet}>
                      <span className={styles.bulletDot} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
