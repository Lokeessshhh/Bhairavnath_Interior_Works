import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Process', path: '/process' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Journal', path: '/blog' }
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div 
        className="container" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className="logo-text"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            fontWeight: '600',
            letterSpacing: '0.02em',
            color: 'var(--color-text-primary)',
            textTransform: 'uppercase'
          }}
        >
          Bhairavnath
          <span style={{ 
            fontWeight: '300', 
            fontSize: '0.9rem', 
            display: 'block', 
            letterSpacing: '0.35em', 
            marginTop: '-4px',
            color: 'var(--color-accent)'
          }}>
            Interior Works
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav 
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem'
          }}
        >
          <ul 
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '2rem',
              fontSize: '0.85rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path}
                  className="nav-link"
                  style={{
                    color: 'var(--color-text-primary)',
                    position: 'relative',
                    padding: '0.5rem 0'
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link 
            to="/#contact" 
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
            className="btn-primary"
            style={{
              padding: '0.75rem 1.75rem',
              fontSize: '0.8rem',
              letterSpacing: '0.08em'
            }}
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          width: '100%',
          height: 'calc(100vh - var(--header-height))',
          backgroundColor: 'var(--color-bg-primary)',
          borderTop: '1px solid var(--color-border)',
          zIndex: 999,
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '2rem',
          transition: 'var(--transition-smooth)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}
      >
        <ul 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            listStyle: 'none',
            gap: '1.75rem',
            fontSize: '1.1rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          {navItems.map((item) => (
            <li key={item.label}>
              <Link 
                to={item.path}
                onClick={handleLinkClick}
                style={{ color: 'var(--color-text-primary)' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link 
          to="/#contact" 
          onClick={(e) => {
            handleLinkClick(); // Close mobile drawer
            if (window.location.pathname === '/') {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, null, '#contact');
              }
            }
          }}
          className="btn-primary"
          style={{
            padding: '1rem 2.5rem',
            width: '80%',
            textAlign: 'center'
          }}
        >
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
