import React from 'react';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We host a thorough discovery dialogue to understand your daily routines, design preferences, space constraints, and budget targets.'
    },
    {
      number: '02',
      title: 'Concept & Moodboards',
      description: 'We develop spatial layout alternatives and tactile boards featuring woods, stones, and fabrics to define the overall look and feel.'
    },
    {
      number: '03',
      title: 'Layout & Material Selection',
      description: 'We draw precise spatial layout designs, and walk you through physical wood types, modular hardware profiles, veneer grains, and finishes.'
    },
    {
      number: '04',
      title: 'Execution & Handover',
      description: 'Our expert carpenters and contractors bring the project to life. We perform rigorous QC inspections and hand over your styled, ready-to-live sanctuary.'
    }
  ];

  return (
    <section id="process" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">How We Work</span>
          <h2 className="section-title">Our Design Process</h2>
          <div 
            style={{
              width: '50px',
              height: '1px',
              backgroundColor: 'var(--color-accent)',
              marginTop: '0.5rem'
            }}
          />
        </div>

        {/* Process Timeline Grid */}
        <div className="grid-4-col" style={{ position: 'relative' }}>
          {steps.map((step, index) => (
            <div 
              key={index}
              className="process-card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem'
              }}
            >
              {/* Step Number Badge */}
              <div 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '4.5rem',
                  fontWeight: '400',
                  color: 'var(--color-border)',
                  lineHeight: '1',
                  marginBottom: '1.5rem',
                  userSelect: 'none',
                  transition: 'var(--transition-smooth)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {step.number}
              </div>

              {/* Step Title */}
              <h3 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: '400',
                  color: 'var(--color-text-primary)',
                  marginBottom: '1rem'
                }}
              >
                {step.title}
              </h3>

              {/* Step Description */}
              <p 
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
