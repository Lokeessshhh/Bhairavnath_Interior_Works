import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container grid-split-2">
        {/* Left: Content Block */}
        <div className="hero-content">
          <span className="section-tag">Best Interior Designer Thane West</span>
          
          <h1 className="hero-title">
            Best Interior Designer <br />
            in Thane & Mumbai
          </h1>

          <p className="hero-description">
            We craft exceptional, warm-minimalist spaces. As a leading turnkey interior contractor in Thane, we specialize in modular kitchen contractor Thane setups, false ceiling contractor Thane installations, custom wardrobes, and high-quality home renovation Thane projects.
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
            <picture>
              <source media="(max-width: 768px)" srcSet="/assets/hero_mobile.webp" />
              <img 
                src="/assets/hero_desktop.webp" 
                alt="Turnkey home renovation Thane - living room design by Bhairavnath Interiors" 
                className="hero-img"
                fetchpriority="high"
                width="1200"
                height="800"
              />
            </picture>
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
