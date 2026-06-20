import React from 'react';

export default function Stats() {
  const statsData = [
    { value: '20+', label: 'Years of Experience' },
    { value: 'Countless', label: 'Spaces Transformed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '100%', label: 'Material Honesty' }
  ];

  return (
    <section 
      className="stats-section"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '4rem 0'
      }}
    >
      <div className="container">
        <div className="grid-4-col" style={{ textAlign: 'center' }}>
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="stat-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h2 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '3.25rem',
                  fontWeight: '400',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.25rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {stat.value}
              </h2>
              <p 
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-text-secondary)'
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
