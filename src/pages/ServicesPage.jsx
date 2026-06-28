import React, { useState, useRef, useEffect } from 'react';
import { Home, Building, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

function LazySection({ children, height = '400px', className = '' }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px 400px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={className}
      style={!isIntersecting ? { minHeight: height } : undefined}
    >
      {isIntersecting ? children : null}
    </div>
  );
}


export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('residential');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Interior Design & Modular Kitchen Services in Thane";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Our interior design services in Thane include modular kitchen installation, POP false ceiling, sliding wardrobe design, carpentry, and home renovation.");
    }
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const residentialServices = [
    { title: '1BHK / 2BHK / 3BHK Flat Interior Price Thane', description: 'We offer customizable 1BHK and 2BHK interior design Thane budget layouts featuring modular wardrobes, BWR modular kitchens, and false ceilings.' },
    { title: 'Modular Kitchen Contractor Thane', description: 'Expert design and installation of L-shaped, U-shaped, and parallel modular kitchens in Thane, featuring acrylic and PU finishes with German hardware.' },
    { title: 'POP & Gypsum False Ceiling Contractor Thane', description: 'Suspended false ceiling design living room Thane setups with profile lights, cove lighting, and magnetic track light installations.' },
    { title: 'Custom Wardrobes & Carpentry Work Thane', description: 'Wardrobe designer Thane services for custom wardrobes, modular sliding wardrobes, TV unit design, and pooja unit combinations.' },
    { title: 'Home Renovation Contractor Thane', description: 'Turnkey interior contractor Thane solutions for complete old flat renovation, resale flat makeovers, and bareshell home interior execution.' }
  ];

  const commercialServices = [
    { title: 'Office Interior Designer Thane', description: 'Turnkey office interior Thane layouts featuring ergonomic modular workspaces, conference tables, and executive desks.' },
    { title: 'Office Interior Designer Navi Mumbai', description: 'Corporate interior designer solutions for commercial spaces, retail stores, showrooms, and cafeterias across Navi Mumbai.' },
    { title: 'Bareshell Office Interior Thane', description: 'Turnkey fit-outs for new commercial complexes, including dry-wall partitions, suspended ceilings, and electrical cabling.' },
    { title: 'Showroom & Shop Interior Designer Thane', description: 'Branded experience display racks, mirror drawers, reception desks, and lighting solutions to maximize retail engagement.' }
  ];

  const materialsList = [
    { 
      category: 'Plywood Grades', 
      items: [
        'BWP Marine Plywood (IS 710 Grade)',
        'BWR Moisture-Resistant Plywood (IS 303 Grade)',
        'Calibrated Plywood (Uniform Thickness Sanded)',
        'Hardwood Block Boards (IS 1659 Wardrobe Shutters)'
      ] 
    },
    { 
      category: 'Hardware Brands', 
      items: [
        'Blum Aventos Lift & Legrabox Drawer Systems',
        'Hettich Sensys Hinges & WingLine Folding Systems',
        'Hafele MatrixBox Premium Soft-Close Drawers'
      ] 
    },
    { 
      category: 'Finishes & Skins', 
      items: [
        'High-Pressure Laminate (1.0mm Merino/Century)',
        'Natural Wood Veneer (Real Wood with PU Coat)',
        'Polyurethane (PU) Matte & High-Gloss Paint',
        'Anti-Scratch Acrylic Sheets (1.5mm Mirror Gloss)'
      ] 
    }
  ];

  const faqs = [
    { q: 'What is the modular kitchen cost in Thane 2026?', a: 'The modular kitchen cost in Thane 2026 varies depending on the layout (L-shaped, U-shaped, parallel) and materials (acrylic, laminate, PU). On average, prices range from ₹1,200 to ₹2,500 per sq ft. We use high-quality BWR plywood and German hardware to ensure longevity.' },
    { q: 'How does a false ceiling rate Thane per sq ft vary?', a: 'Our gypsum false ceiling rate starts from ₹65 per sq ft. Custom POP ceilings with profile lights or cove lighting configurations may cost slightly higher depending on the complexity of the design.' },
    { q: 'How do you choose the best false ceiling material for Mumbai humidity?', a: 'Given Mumbai\'s high humidity, moisture-resistant gypsum boards are generally the best false ceiling material. They prevent sagging and damp spots compared to standard commercial plaster boards.' },
    { q: 'What is a typical 2BHK interior design cost Thane budget?', a: 'A standard 2BHK interior design cost in Thane ranges from ₹3.5 Lakhs to ₹7 Lakhs for carpentry, wardrobes, and basic modular kitchen renovation, depending on material specifications.' }
  ];

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">What We Offer</span>
          <h1 className="page-title">
            Turnkey Interior Contractor & Modular Kitchen in Thane
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Complete home renovation contractor Thane services including modular wardrobe setups, gypsum POP false ceilings, custom carpentry work, and turnkey office interior design.
          </p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* Tab Navigation */}
      <section style={{ paddingBottom: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('residential')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              backgroundColor: activeTab === 'residential' ? 'var(--color-text-primary)' : 'var(--color-bg-secondary)',
              color: activeTab === 'residential' ? '#FFFFFF' : 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <Home size={18} />
            Residential Properties
          </button>
          
          <button
            onClick={() => setActiveTab('commercial')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              backgroundColor: activeTab === 'commercial' ? 'var(--color-text-primary)' : 'var(--color-bg-secondary)',
              color: activeTab === 'commercial' ? '#FFFFFF' : 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <Building size={18} />
            Commercial Properties
          </button>
        </div>
      </section>

      {/* Services Grid Content */}
      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div className="grid-2-col">
            {(activeTab === 'residential' ? residentialServices : commercialServices).map((service, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <h2 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: '400',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {service.title}
                </h2>
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

      {/* Material & Hardware Specifications */}
      <LazySection height="450px">
        <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="section-tag">Specifications</span>
              <h2 className="section-title">Materials & Hardware We Use</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '500px', marginTop: '0.5rem' }}>
                We build using only authentic, top-grade wood composites and premium German-engineered sliding fittings.
              </p>
              <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '0.5rem' }} />
            </div>

            <div className="grid-3-col">
              {materialsList.map((material, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)',
                    padding: '3rem 2.25rem',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--color-accent)' }}>
                    <Layers size={22} />
                    <h3 
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {material.category}
                    </h3>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {material.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-accent)', marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* FAQs Section */}
      <LazySection height="500px">
        <section className="section">
          <div className="container" style={{ maxWidth: '850px' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="section-tag">Answering Questions</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '0.5rem' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    padding: '1.5rem 2rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {faq.q}
                    </h3>
                    {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {openFaq === index && (
                    <p 
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        marginTop: '1.25rem',
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '1rem'
                      }}
                    >
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>
    </main>
  );
}
