import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';

// Lazy-load sections to split code from the initial page loading bundle
const Services = lazy(() => import('../components/Services'));
const ExecutionStandards = lazy(() => import('../components/ExecutionStandards'));
const DesignJournal = lazy(() => import('../components/DesignJournal'));
const Interactive3DLayout = lazy(() => import('../components/Interactive3DLayout'));
const Process = lazy(() => import('../components/Process'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));

function LazySection({ children, height = '400px', className = '' }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px 400px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} ${isIntersecting ? 'revealed' : ''}`}
      style={!isIntersecting ? { minHeight: height } : undefined}
    >
      {isIntersecting ? (
        <Suspense fallback={null}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      
      <LazySection height="500px" className="reveal-on-scroll">
        <Services />
      </LazySection>

      <LazySection height="700px" className="reveal-on-scroll">
        <ExecutionStandards />
      </LazySection>

      <LazySection height="700px" className="reveal-on-scroll">
        <DesignJournal />
      </LazySection>

      {/* Interactive 3D Exploded Layout Section */}
      <LazySection height="100vh">
        <Interactive3DLayout />
      </LazySection>

      <LazySection height="500px" className="reveal-on-scroll">
        <Process />
      </LazySection>

      <LazySection height="600px" className="reveal-on-scroll">
        <Testimonials />
      </LazySection>

      <LazySection height="600px" className="reveal-on-scroll">
        <Contact />
      </LazySection>
    </main>
  );
}
