'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HeroContent.module.css';

export default function HeroContent() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameTopRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.from(taglineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          nameTopRef.current,
          { y: 80, opacity: 0, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          ctaRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Small tagline */}
      <p ref={taglineRef} className={styles.tagline}>
        <span className={styles.taglineDot} />
        Full Stack Developer · Python · MERN Stack
      </p>

      {/* Single line name */}
      <div ref={nameTopRef} className={styles.nameBlock}>
        <span className={styles.nameMain}>DEEKSHITH&nbsp;</span><span className={styles.nameS}>S</span>
      </div>

      {/* Subtitle */}
      <p ref={subtitleRef} className={styles.subtitle}>
        Building scalable, impactful web applications
        <br />
        <span className={styles.subtitleAccent}>Bengaluru, India</span>
      </p>

      {/* CTA Buttons */}
      <div ref={ctaRef} className={styles.cta}>
        <button
          className={styles.ctaPrimary}
          onClick={scrollToAbout}
          id="btn-view-projects"
        >
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <a
          href="mailto:dikideeku@gmail.com"
          className={styles.ctaSecondary}
          id="btn-contact"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
