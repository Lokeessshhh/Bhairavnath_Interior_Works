import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container grid-split-2">
        {/* Left: Content Block */}
        <div className="hero-content">
          <span className="section-tag">Premium Interior Studio</span>
          
          <h1 className="hero-title">
            Designing Spaces <br />
            That Inspire <span>Living</span>
          </h1>

          <p className="hero-description">
            We craft exceptional, warm-minimalist interiors that blend functionality and premium aesthetics. Every space is curated with natural textures, balanced proportions, and a focus on timeless beauty.
          </p>

          <div className="hero-buttons">
            <Link 
              to="/projects" 
              className="btn-primary"
              style={{ gap: '0.5rem' }}
            >
              Explore Our Work
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/#contact" 
              className="btn-secondary"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, null, '#contact');
                  }
                }
              }}
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Right: Premium Image Block with Overlapping Badge */}
        <div className="hero-image-wrapper">
          {/* Main Hero Image */}
          <div className="hero-image-container">
            <img 
              src="/assets/hero_desktop.webp" 
              srcSet="/assets/hero_mobile.webp 600w,
                      /assets/hero_desktop.webp 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Warm minimalist luxury living room" 
              className="hero-img"
              fetchpriority="high"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            />
          </div>

          {/* Floating Stats Badge */}
          <div className="hero-floating-badge">
            <h2>20+</h2>
            <div>
              <h3>Years of Expertise</h3>
              <p>We plan and design thoughtful, durable functional spaces.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
