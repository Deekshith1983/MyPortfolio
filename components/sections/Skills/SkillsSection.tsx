'use client';

import styles from './SkillsSection.module.css';

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    icon: '{ }',
    color: '#ff8c42',
    skills: ['Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frontend',
    icon: '◻',
    color: '#4a9eff',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Backend',
    icon: '⚙',
    color: '#a78bfa',
    skills: ['Django', 'Django REST Framework', 'Node.js', 'Express.js'],
  },
  {
    label: 'Databases',
    icon: '◉',
    color: '#34d399',
    skills: ['MySQL', 'MongoDB'],
  },
  {
    label: 'Tools & Platforms',
    icon: '◈',
    color: '#f472b6',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma', 'VS Code', 'Cursor', 'Railway', 'Render'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">
            My <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="section-subtitle">
            A curated set of technologies I use to build full-stack, data-driven, and AI-powered products.
          </p>
        </div>

        <div className={styles.grid}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label} className={`glass-card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon} style={{ color: cat.color }}>
                  {cat.icon}
                </span>
                <h3 className={styles.cardTitle}>{cat.label}</h3>
                <div className={styles.cardAccent} style={{ background: cat.color }} />
              </div>
              <div className={styles.pills}>
                {cat.skills.map((skill) => (
                  <span key={skill} className={styles.pill} style={{ '--accent': cat.color } as React.CSSProperties}>
                    <span className={styles.pillDot} style={{ background: cat.color }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
