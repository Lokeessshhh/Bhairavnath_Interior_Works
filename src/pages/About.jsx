import React from 'react';
import aboutPhotos from '../data/aboutPhotos.json';

const getOptimizedUrl = (url, width = 600) => {
  if (url && url.includes('cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

export default function About() {
  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Editorial Header */}
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Our Heritage</span>
          <h1 className="page-title" style={{ maxWidth: '800px' }}>
            The Story of Roshanlal Lohar & <br />Bhairavnath Interior Works
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Humble origins, 20+ years of hands-on mastery, and a self-made craftsman's dedication to home execution in Mumbai.
          </p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div className="grid-split-about">
            {/* Left Narrative */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h2 
                style={{ 
                   fontFamily: 'var(--font-serif)', 
                  fontSize: '2rem', 
                  fontWeight: '400', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '2rem',
                  lineHeight: '1.3'
                }}
              >
                A Self-Made Craftsman’s Path
              </h2>
              
              <p 
                style={{ 
                  fontSize: '1.05rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: '1.8', 
                  marginBottom: '1.5rem' 
                }}
              >
                In the early 1990s, a young Roshanlal Lohar arrived in Mumbai from his hometown with nothing but a dream for a better life. With no family backing or capital, he started from the absolute ground up, learning carpentry under a local workshop master in central Mumbai.
              </p>

              <p 
                style={{ 
                  fontSize: '1.05rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: '1.8', 
                  marginBottom: '1.5rem' 
                }}
              >
                He spent his first years sweeping wood shavings, holding heavy plywood sheets, and observing site execution. Slowly, his dedication earned him hands-on training. Under the strict tutelage of workshop elders, he mastered modular drawer maths, wood grain alignments, and how laminates behave under Mumbai's highly humid monsoons.
              </p>

              <p 
                style={{ 
                  fontSize: '1.05rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: '1.8', 
                  marginBottom: '2rem' 
                }}
              >
                By the early 2000s, Roshanlal had established himself as a trusted name. Known across Dadar and central Mumbai for his honest pricing, punctuality, and zero-compromise timber quality, he founded **Bhairavnath Interior Works**. Today, with over 20+ years of experience, he still visits sites daily to ensure every joint and edge is cut to perfection.
              </p>

              {/* Highlight Quote */}
              <div 
                style={{ 
                  borderLeft: '2px solid var(--color-accent)', 
                  paddingLeft: '1.5rem', 
                  fontStyle: 'italic',
                  marginTop: '1rem'
                }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
                  "Machines can cut the board, but only a carpenter's hand knows if the wood is aligned with the soul of the home."
                </p>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-contrast)', display: 'block', marginTop: '0.5rem' }}>
                  — Roshanlal Lohar
                </span>
              </div>
            </div>

            {/* Right Photo */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 40px rgba(28, 25, 23, 0.04)',
                overflow: 'hidden'
              }}
            >
              <img 
                src="/assets/roshanlal_lohar.webp" 
                alt="Roshanlal Lohar craftsmanship" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top'
                }}
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Honors & Ceremonies Recognition */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="section-tag">Recognition</span>
            <h2 className="section-title">Moments of Appreciation</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '600px', lineHeight: '1.6', marginTop: '0.5rem' }}>
              Roshanlal Lohar receiving honors and warm felicitations from clients and local associations for over two decades of honest execution and craftsmanship.
            </p>
            <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '1.5rem' }} />
          </div>

          {/* Pictures Grid */}
          <div className="recognition-grid">
            {aboutPhotos.map((photo, index) => (
              <div 
                key={photo.id || index}
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  padding: '1rem',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'var(--transition-smooth)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(28, 25, 23, 0.05)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.02)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.0)';
                }}
              >
                <div style={{ overflow: 'hidden', height: '280px', border: '1px solid var(--color-border)' }}>
                  <img 
                    src={getOptimizedUrl(photo.image, 600)} 
                    alt={photo.title || 'Recognition Ceremony'} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'var(--transition-smooth)'
                    }}
                    loading="lazy"
                  />
                </div>
                <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent-contrast)' }}>
                    Client Felicitation
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: '400', marginTop: '0.25rem', color: 'var(--color-text-primary)' }}>
                    {photo.title || 'Ceremony Moment'}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
