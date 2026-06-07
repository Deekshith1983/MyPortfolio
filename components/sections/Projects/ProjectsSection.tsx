'use client';

import { useState } from 'react';
import styles from './ProjectsSection.module.css';

const PROJECTS = [
  {
    id: 'jobify',
    name: 'Jobify',
    tagline: 'Full Stack Job Board Platform',
    stack: ['Django', 'React', 'MySQL', 'DRF', 'Socket.IO'],
    stackColor: '#ff8c42',
    description:
      'A complete job board platform connecting recruiters and candidates through secure role-based dashboards with real-time communication.',
    features: [
      'JWT-based authentication & authorization',
      'Recruiter & Job Seeker dashboards',
      'Job posting & application management',
      'Real-time communication via Socket.IO',
      'RESTful API architecture',
    ],
    impact: [
      { val: '⚡', label: 'Streamlined hiring workflows' },
      { val: '🔒', label: 'Secure role-based access control' },
      { val: '📊', label: 'Optimized API across large datasets' },
    ],
    accent: '#ff8c42',
    githubUrl: 'https://github.com/Deekshith1983/Jobify',
  },
  {
    id: 'credverify',
    name: 'CredVerify',
    tagline: 'Candidate Intelligence & Verification',
    stack: ['MongoDB', 'Express', 'React', 'Node', 'AI'],
    stackColor: '#a78bfa',
    description:
      'An AI-powered candidate verification platform helping recruiters evaluate credibility through intelligent scoring and verification systems.',
    features: [
      'Candidate credibility scoring engine',
      'GitHub repository verification',
      'Resume & project assessment',
      'JWT-based authentication system',
      'Automated repository validation',
    ],
    impact: [
      { val: '🧠', label: 'Weighted credibility scoring model' },
      { val: '🐙', label: 'GitHub API integration' },
      { val: '🤖', label: 'Automated repo validation engine' },
    ],
    accent: '#a78bfa',
    githubUrl: 'https://github.com/Deekshith1983/Candidate_Intelligence_And_Verification_System',
  },
  {
    id: 'skillswap',
    name: 'Skill Swap',
    tagline: 'Peer Learning Platform',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
    stackColor: '#34d399',
    description:
      'A platform enabling users to exchange skills and connect with learners and mentors through structured session requests.',
    features: [
      'JWT authentication',
      'User profile management',
      'Session request workflows',
      'Secure API architecture',
      'Optimized MongoDB schema design',
    ],
    impact: [
      { val: '🔄', label: 'Skill exchange system' },
      { val: '👥', label: 'Mentor-learner matching' },
      { val: '🛡️', label: 'Secure session management' },
    ],
    accent: '#34d399',
    githubUrl: 'https://github.com/Deekshith1983/Skill_Swap',
  },
  {
    id: 'cybertextshield',
    name: 'CyberTextShield',
    tagline: 'SMS Phishing Detection System',
    stack: ['React Native', 'Node.js', 'Python', 'HGNN'],
    stackColor: '#f472b6',
    description:
      'A mobile security app detecting phishing SMS messages using machine learning with 91% detection accuracy and real-time classification.',
    features: [
      'SMS phishing detection',
      'JWT and OTP authentication',
      'Machine learning integration',
      'Real-time classification',
      'Mobile-first user experience',
    ],
    impact: [
      { val: '91%', label: 'Detection accuracy' },
      { val: '⚡', label: 'Low-latency prediction system' },
      { val: '🔐', label: 'End-to-end secure architecture' },
    ],
    accent: '#f472b6',
    githubUrl: 'https://github.com/punithhmabar/CyberTextShield_mobile',
  },
];

export default function ProjectsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Featured Projects</p>
          <h2 className="section-title">
            What I've <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle">
            Production-ready applications spanning full-stack web, AI, mobile, and data systems.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className={`${styles.card} ${hovered === proj.id ? styles.cardHovered : ''}`}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              id={`project-${proj.id}`}
              style={{ '--proj-accent': proj.accent } as React.CSSProperties}
            >
              {/* Glow accent */}
              <div className={styles.cardGlow} style={{ background: proj.accent }} />

              {/* Top */}
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.projName}>{proj.name}</h3>
                  <p className={styles.projTagline}>{proj.tagline}</p>
                </div>
                <div className={styles.arrowIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </div>
              </div>

              {/* Stack */}
              <div className={styles.stack}>
                {proj.stack.map((s) => (
                  <span key={s} className={styles.stackTag} style={{ borderColor: `${proj.accent}30`, color: proj.accent }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className={styles.description}>{proj.description}</p>

              {/* Features */}
              <ul className={styles.features}>
                {proj.features.slice(0, 3).map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <span className={styles.featureDot} style={{ background: proj.accent }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Impact */}
              <div className={styles.impact}>
                {proj.impact.map((imp, i) => (
                  <div key={i} className={styles.impactItem}>
                    <span className={styles.impactVal}>{imp.val}</span>
                    <span className={styles.impactLabel}>{imp.label}</span>
                  </div>
                ))}
              </div>

              {/* View Project Button */}
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewBtn}
                style={{ '--proj-accent': proj.accent } as React.CSSProperties}
                id={`view-project-${proj.id}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
