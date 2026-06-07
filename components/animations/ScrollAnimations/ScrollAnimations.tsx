'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Small delay to let DOM paint first
    const timer = setTimeout(() => {
      // ── Section headers (section-label + section-title + section-subtitle) ──
      gsap.utils.toArray<HTMLElement>('.section-label, .section-title, .section-subtitle').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Glass cards (skills, certs, achievements) ──
      gsap.utils.toArray<HTMLElement>('.glass-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: (i % 4) * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Project cards — slide in alternating sides ──
      gsap.utils.toArray<HTMLElement>('[id^="project-"]').forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Experience timeline card ──
      gsap.utils.toArray<HTMLElement>('[class*="ExperienceSection_card"]').forEach((card) => {
        gsap.from(card, {
          x: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── About section — photo from left, bio from right ──
      const photoCol = document.querySelector('[class*="AboutSection_photoCol"]') as HTMLElement;
      const bioCol = document.querySelector('[class*="AboutSection_bioCol"]') as HTMLElement;

      if (photoCol) {
        gsap.from(photoCol, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoCol,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (bioCol) {
        gsap.from(bioCol, {
          x: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioCol,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // ── Contact cards — stagger from below ──
      gsap.utils.toArray<HTMLElement>('[id^="contact-"]').forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Skill pills — micro stagger within each card ──
      gsap.utils.toArray<HTMLElement>('[class*="SkillsSection_pill"]').forEach((pill, i) => {
        gsap.from(pill, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          delay: (i % 8) * 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: pill,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
