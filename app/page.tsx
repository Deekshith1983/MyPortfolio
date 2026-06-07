'use client';

import dynamic from 'next/dynamic';

// Layout
import Navbar from '@/components/layout/Navbar/Navbar';

// Hero
import VideoIntro from '@/components/hero/VideoIntro/VideoIntro';
import HeroContent from '@/components/hero/HeroContent/HeroContent';
import ScrollIndicator from '@/components/hero/ScrollIndicator/ScrollIndicator';

// Sections
import AboutSection from '@/components/sections/About/AboutSection';
import SkillsSection from '@/components/sections/Skills/SkillsSection';
import ExperienceSection from '@/components/sections/Experience/ExperienceSection';
import ProjectsSection from '@/components/sections/Projects/ProjectsSection';
import ContactSection from '@/components/sections/Contact/ContactSection';

// Animations
import ScrollAnimations from '@/components/animations/ScrollAnimations/ScrollAnimations';

import styles from './page.module.css';

// Three.js must load client-side only
const CinematicLayer = dynamic(
  () => import('@/components/hero/CinematicLayer/CinematicLayer'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className={styles.heroSection} id="hero">
          {/* Blurred video BG + Foreground video */}
          <VideoIntro />

          {/* Three.js cinematic bokeh particles */}
          <CinematicLayer />

          {/* GSAP-animated text content */}
          <HeroContent />

          {/* Scroll indicator */}
          <ScrollIndicator />
        </section>

        {/* ── PORTFOLIO SECTIONS ───────────────────────────── */}
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />

        {/* Scroll reveal animations for all sections */}
        <ScrollAnimations />
      </main>
    </>
  );
}
