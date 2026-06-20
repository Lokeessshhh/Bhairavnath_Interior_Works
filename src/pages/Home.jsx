import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import ExecutionStandards from '../components/ExecutionStandards';
import DesignJournal from '../components/DesignJournal';
import Interactive3DLayout from '../components/Interactive3DLayout';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
  // Scroll Reveal Intersection Observer (mounted for Home landing page)
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly to trigger naturally
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Hero />
      <Stats />
      
      <div className="reveal-on-scroll">
        <Services />
      </div>

      <div className="reveal-on-scroll">
        <ExecutionStandards />
      </div>

      <div className="reveal-on-scroll">
        <DesignJournal />
      </div>

      {/* Interactive 3D Exploded Layout Section */}
      <Interactive3DLayout />

      <div className="reveal-on-scroll">
        <Process />
      </div>

      <div className="reveal-on-scroll">
        <Testimonials />
      </div>

      <div className="reveal-on-scroll">
        <Contact />
      </div>
    </>
  );
}
