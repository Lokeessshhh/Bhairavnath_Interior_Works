import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--header-height)',
        backgroundColor: 'var(--color-bg-primary)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div 
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
          paddingTop: '3rem',
          paddingBottom: '3rem'
        }}
      >
        {/* Left: Content Block */}
        <div 
          className="hero-content animate-slide-up"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <span className="section-tag">Premium Interior Studio</span>
          
          <h1 
            className="hero-title"
            style={{
              fontSize: '4.5rem',
              fontWeight: '400',
              lineHeight: '1.1',
              color: 'var(--color-text-primary)',
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-serif)'
            }}
          >
            Designing Spaces <br />
            That Inspire <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Living</span>
          </h1>

          <p 
            style={{
              fontSize: '1.15rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '3rem',
              maxWidth: '560px',
              lineHeight: '1.7'
            }}
          >
            We craft exceptional, warm-minimalist interiors that blend functionality and premium aesthetics. Every space is curated with natural textures, balanced proportions, and a focus on timeless beauty.
          </p>

          <div 
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <Link 
              to="/projects" 
              className="btn-primary"
              style={{
                gap: '0.5rem'
              }}
            >
              Explore Our Work
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/about" 
              className="btn-secondary"
            >
              Our Philosophy
            </Link>
          </div>
        </div>

        {/* Right: Premium Image Block with Overlapping Badge */}
        <div 
          className="hero-image-wrapper animate-slide-in-right"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
        >
          {/* Main Hero Image */}
          <div 
            style={{
              width: '100%',
              height: '560px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(28, 25, 23, 0.08)',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600" 
              alt="Warm minimalist luxury living room" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 8s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            />
          </div>

          {/* Floating Stats Badge */}
          <div 
            className="hero-floating-badge"
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '-40px',
              backgroundColor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(28, 25, 23, 0.08)',
              maxWidth: '240px',
              transition: 'var(--transition-smooth)'
            }}
          >
            <h3 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                fontWeight: '400',
                color: 'var(--color-accent)',
                marginBottom: '0.25rem'
              }}
            >
              20+
            </h3>
            <h4 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem'
              }}
            >
              Years of Expertise
            </h4>
            <p 
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.4'
              }}
            >
              We plan and design thoughtful, durable functional spaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
