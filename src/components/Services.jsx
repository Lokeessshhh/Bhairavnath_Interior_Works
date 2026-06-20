import React from 'react';
import { Palette, Compass, Hammer, Sparkles } from 'lucide-react';

export default function Services() {
  const servicesData = [
    {
      icon: <Palette size={32} strokeWidth={1.2} />,
      title: 'Interior Design',
      description: 'From initial concept to final execution, we deliver bespoke, beautiful interiors tailored to your taste, character, and lifestyle.'
    },
    {
      icon: <Compass size={32} strokeWidth={1.2} />,
      title: 'Space Planning',
      description: 'Smart, calculated architectural layouts that maximize space functionality, enhance circulation, and establish flow.'
    },
    {
      icon: <Hammer size={32} strokeWidth={1.2} />,
      title: 'Custom Furniture',
      description: 'Unique, custom-designed furniture pieces made to perfectly fit your home, crafted by select local artisans.'
    },
    {
      icon: <Sparkles size={32} strokeWidth={1.2} />,
      title: 'Styling & Decor',
      description: 'The final, crucial touches—curating art, lighting, textiles, and plants to breathe texture, warmth, and personality into the room.'
    }
  ];

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Our Expertise</span>
          <h2 className="section-title" style={{ maxWidth: '600px' }}>
            Tailored Designs. Timeless Spaces.
          </h2>
          <div 
            style={{
              width: '50px',
              height: '1px',
              backgroundColor: 'var(--color-accent)',
              marginTop: '0.5rem'
            }}
          />
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem'
          }}
        >
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className="service-card"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                padding: '3rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'var(--transition-smooth)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(194, 159, 104, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon Container */}
              <div 
                style={{
                  color: 'var(--color-accent)',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '50%'
                }}
              >
                {service.icon}
              </div>

              <h3 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: '400',
                  color: 'var(--color-text-primary)',
                  marginBottom: '1rem'
                }}
              >
                {service.title}
              </h3>

              <p 
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
