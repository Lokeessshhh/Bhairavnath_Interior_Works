import React from 'react';
import { ShieldCheck, ClipboardCheck, Clock } from 'lucide-react';

export default function ExecutionStandards() {
  const pillars = [
    {
      icon: <ShieldCheck size={28} strokeWidth={1.5} />,
      title: 'Daily Site Supervision',
      description: 'Roshanlal Lohar visits every site daily to personally inspect measurements, cuts, and modular alignments, ensuring zero compromise on execution quality.'
    },
    {
      icon: <ClipboardCheck size={28} strokeWidth={1.5} />,
      title: '100% Material Honesty',
      description: 'We only use authentic BWR Marine plywood and genuine hardware fittings (like Blum, Hettich, or Hafele). No low-grade commercial boards or imitation fittings.'
    },
    {
      icon: <Clock size={28} strokeWidth={1.5} />,
      title: 'Clean Timelines & Transparency',
      description: 'From layout to final polish, we maintain clean workspaces, daily WhatsApp photo progress updates, and a transparent timeline with no hidden costs.'
    }
  ];

  return (
    <section id="philosophy" className="section" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="container">
        <div className="grid-split-about">
          {/* Left Column: Premium Interior visual */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              border: '1px solid var(--color-border)',
              boxShadow: '0 20px 40px rgba(28, 25, 23, 0.04)',
              overflow: 'hidden'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" 
              alt="Premium luxury modern home interiors" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                aspectRatio: '4/5'
              }}
            />
          </div>

          {/* Right Column: Execution Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="section-tag">Quality Standards</span>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>
              Turnkey Execution. <br />Mumbai's Trusted Quality.
            </h2>
            
            <p 
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.75',
                marginBottom: '3rem',
                maxWidth: '540px'
              }}
            >
              At Bhairavnath Interior Works, we bring organized professionalism and deep craftsmanship to home interiors. We take the stress out of your home renovation by executing with absolute transparency.
            </p>

            {/* Pillars Lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', width: '100%' }}>
              {pillars.map((pillar, index) => (
                <div key={index} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div 
                    style={{ 
                      color: 'var(--color-accent)', 
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderRadius: '50%',
                      border: '1px solid var(--color-border)',
                      flexShrink: 0
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: 'var(--color-text-primary)', 
                        letterSpacing: '0.01em',
                        marginBottom: '0.35rem' 
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p 
                      style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--color-text-secondary)', 
                        lineHeight: '1.6',
                        maxWidth: '460px'
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
