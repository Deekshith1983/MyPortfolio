'use client';

import styles from './ScrollIndicator.module.css';

export default function ScrollIndicator() {
  const handleClick = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      className={styles.indicator}
      onClick={handleClick}
      aria-label="Scroll to next section"
      id="scroll-indicator"
    >
      <span className={styles.label}>Scroll</span>
      <div className={styles.lineWrapper}>
        <div className={styles.line} />
      </div>
      <svg
        className={styles.chevron}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
