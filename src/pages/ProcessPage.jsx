import React from 'react';
import { Calendar, Layers, Eye, Cpu, Send, ShieldCheck, Check } from 'lucide-react';

export default function ProcessPage() {
  const steps = [
    {
      icon: <Calendar size={24} />,
      number: '01',
      title: 'Consultation & Site Meeting',
      description: 'We host a thorough discovery meeting to discuss layout goals, and conduct a detailed physical site visit to inspect dimensions, dampness, and structural spaces.'
    },
    {
      icon: <Layers size={24} />,
      number: '02',
      title: 'Concept & Moodboard',
      description: 'We develop spatial layout options and compile tactile boards featuring wood types, sand plasters, and fabrics to define the overall aesthetic direction.'
    },
    {
      icon: <Eye size={24} />,
      number: '03',
      title: 'Layout & Material Curation',
      description: 'We draw detailed layout plans and match exact veneer patterns, wood grains, laminates, and modular cabinet hardware.'
    },
    {
      icon: <Cpu size={24} />,
      number: '04',
      title: 'Bespoke Workshop Fabrication',
      description: 'Carcasses, doors, and partition units are cut, routed, and edge-sealed at our workshop using high-quality BWR marine plywood and genuine hardware.'
    },
    {
      icon: <Send size={24} />,
      number: '05',
      title: 'On-Site Execution & Daily Updates',
      description: 'Our expert carpenters assemble components and execute custom carvings on-site. We send daily WhatsApp photo progress updates so you see work in real-time.'
    },
    {
      icon: <ShieldCheck size={24} />,
      number: '06',
      title: 'Final Handover & Lifetime Care',
      description: 'Following a strict quality checklist alignment, we clean the site, perform final polishes, and hand over your ready-to-live home with lifetime care support.'
    }
  ];

  const qualityChecks = [
    'Plywood density & thickness inspection',
    'Water-resistance check on base boards',
    'Edge-band sealing check (prevents swelling)',
    'Concealed hinge alignment check (0mm gap)',
    'Electrical wiring clearance validation',
    'Appliance modular slot fitting test',
    'Veneer grain alignment matching check',
    'Post-execution dust cleanup inspection'
  ];

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3.5rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">How We Work</span>
          <h1 className="page-title">
            Our Work Process
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            From the first site inspection to material styling and turnkey execution, we follow a transparent, organized workflow.
          </p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* 6 Steps Timeline */}
      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div className="grid-3-col">
            {steps.map((step, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '3rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Step Number overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '25px',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3rem',
                    color: 'var(--color-border)',
                    lineHeight: '1',
                    opacity: 0.6
                  }}
                >
                  {step.number}
                </div>

                {/* Icon Container */}
                <div 
                  style={{
                    color: 'var(--color-accent)',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    backgroundColor: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '50%'
                  }}
                >
                  {step.icon}
                </div>

                <h3 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: '400',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem'
                  }}
                >
                  {step.title}
                </h3>

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

      {/* Quality Standards Tracker */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-split-about">
            {/* Left: Headline info */}
            <div>
              <span className="section-tag">Quality Assurance</span>
              <h2 className="section-title">Our 146-Point Site Checklists</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.75', fontSize: '1.05rem', marginBottom: '2rem' }}>
                We believe that modular engineering must meet strict verification standards. Our site supervisors check all modular installations against checklist markers before handover.
              </p>
              
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '2rem'
                }}
              >
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-accent)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-primary)' }}>
                  Transparency Guarantee <br />On Materials Sourced
                </div>
              </div>
            </div>

            {/* Right: Checkmarks Grid */}
            <div 
              className="grid-2-col checklist-card-wrapper"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                gap: '2rem',
                boxShadow: '0 15px 30px rgba(0,0,0,0.02)'
              }}
            >
              {qualityChecks.map((check, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div 
                    style={{ 
                      color: '#FFFFFF', 
                      backgroundColor: 'var(--color-accent)', 
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '3px'
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', lineHeight: '1.4' }}>
                    {check}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
