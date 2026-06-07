'use client';

import styles from './AchievementsSection.module.css';

const ACHIEVEMENTS = [
  {
    icon: '🥈',
    title: '2nd Prize',
    detail: 'National-Level Technical Symposium Paper Presentation',
    color: '#c0c0c0',
  },
  {
    icon: '💻',
    title: '150+ Problems',
    detail: 'Solved on LeetCode — Arrays, Strings, Linked Lists, SQL',
    color: '#ff8c42',
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className={`section ${styles.achievements}`}>
      <div className="container">
        <p className="section-label">Recognition</p>
        <h2 className="section-title">
          Key <span className="gradient-text">Achievements</span>
        </h2>

        <div className={styles.grid}>
          {ACHIEVEMENTS.map((ach, i) => (
            <div key={i} className={`glass-card ${styles.card}`} id={`achievement-${i}`}>
              <div className={styles.cardIcon}>{ach.icon}</div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle} style={{ color: ach.color }}>
                  {ach.title}
                </h3>
                <p className={styles.cardDetail}>{ach.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
