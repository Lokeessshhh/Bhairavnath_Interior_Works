import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Compass } from 'lucide-react';

export default function Footer() {
  const navItems = [
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Our Process', path: '/process' },
    { label: 'Reviews', path: '/testimonials' },
    { label: 'Insights Journal', path: '/blog' }
  ];

  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-bg-dark)',
        color: 'var(--color-text-light)',
        borderTop: '1px solid var(--color-border-dark)',
        paddingTop: '6rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        {/* Foot Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: '5rem',
            marginBottom: '5rem'
          }}
        >
          {/* Col 1: About & Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link 
              to="/" 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: '600',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}
            >
              Bhairavnath
              <span style={{ 
                fontWeight: '300', 
                fontSize: '0.8rem', 
                display: 'block', 
                letterSpacing: '0.35em', 
                marginTop: '-4px',
                color: 'var(--color-accent)'
              }}>
                Interior Works
              </span>
            </Link>
            
            <p 
              style={{
                color: 'rgba(244, 241, 234, 0.6)',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '360px'
              }}
            >
              Bespoke luxury interior work based in Mumbai. Crafting functional layouts, high-end carpentry, and warm minimalist atmospheres all over Mumbai.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1.25rem', color: 'rgba(244, 241, 234, 0.6)' }}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                style={{ transition: 'var(--transition-fast)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'}
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                style={{ transition: 'var(--transition-fast)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Pinterest"
                style={{ transition: 'var(--transition-fast)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'}
              >
                <Compass size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                marginBottom: '1.75rem'
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'rgba(244, 241, 234, 0.6)' }}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.path}
                    style={{ transition: 'var(--transition-fast)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Coordinates */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                marginBottom: '1.75rem'
              }}
            >
              Get In Touch
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(244, 241, 234, 0.6)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Based in Mumbai,<br />
              Serving All Over Mumbai,<br />
              Maharashtra
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(244, 241, 234, 0.6)', marginBottom: '0.5rem' }}>
              T: +91 77383 37299 / <a href="https://wa.me/917738337299?text=Hello%20Bhairavnath%20Interior%20Works,%20I%20would%20like%20to%20inquire%20about%20a%20design%20consultation." target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>WhatsApp</a>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(244, 241, 234, 0.6)' }}>
              E: roshanlohar80@gmail.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border-dark)', marginBottom: '2.5rem' }} />

        {/* Bottom copyright row */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'rgba(244, 241, 234, 0.4)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <p>© {new Date().getFullYear()} Bhairavnath Interior Works. All Rights Reserved.</p>
          <p style={{ letterSpacing: '0.05em' }}>
            Designed for <span style={{ color: 'var(--color-accent)' }}>Quiet Luxury</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
