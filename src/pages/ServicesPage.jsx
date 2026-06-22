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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const residentialServices = [
    { title: 'Flats (1BHK / 2BHK / 3BHK)', description: 'Optimized spatial zoning, smart modular wardrobes, compact BWR modular kitchens, false ceilings, and custom space partitions.' },
    { title: 'Big Flats & Duplexes', description: 'Double-height false ceilings, main entrance teak wood doors, veneer wall paneling, and custom modular dining layouts.' },
    { title: 'Bungalows & Villas', description: 'Full-scale structural timber cladding, customized walk-in closets, bespoke premium modular layouts, and heavy hardwood joinery.' },
    { title: 'Farmhouses', description: 'Natural textured rustic finishes, solid timber roof rafters, wood decking, and organic partition dividers.' },
    { title: 'Apartment Societies', description: 'Society common entry lobbies, modular security desks, custom society offices, and common area seating.' }
  ];

  const commercialServices = [
    { title: 'Shops & Retail Stores', description: 'Heavy-duty modular display racks, glass checkout counters, checkout cashier desks, and branded accent lighting panels.' },
    { title: 'Showrooms', description: 'Spotlight ceiling structures, modular experience booths, glass divider partitions, and premium veneer backdrop panels.' },
    { title: 'Offices', description: 'Ergonomic conference tables, modular workspaces, acoustic drywall dividers, file shelving, and executive desks.' },
    { title: 'Restaurants & Cafes', description: 'Commercial kitchen counters, custom booth bench seating, bar counter trims, and custom-fabricated dining tables.' },
    { title: 'Salons & Clinics', description: 'Hygienic easy-clean countertops, mirror drawers, clinic cabin dividers, and client reception desks.' },
    { title: 'Gyms & Schools', description: 'Locker systems, administration desks, student classroom benches, rubber flooring margins, and dry-wall dividers.' },
    { title: 'Small Malls & Complexes', description: 'Commercial restroom cabinetry, walkway modular planters, divider screens, and customized kiosk stands.' }
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
    { q: 'How do you ensure the long-term durability of modular cabinets?', a: 'We focus on lifetime care support rather than marketing warranties. Because we build with genuine BWP/BWR Marine Plywood and authentic German hardware from Hettich and Blum, our modular woodwork is built to last decades. If you ever face an alignment issue, a drawer rattle, or door creak down the line, we are just a call away.' },
    { q: 'Which plywood should I use for a kitchen in Mumbai?', a: 'We strictly recommend and use Boiling Water Proof (BWP) Marine Plywood conforming to IS 710 specifications for kitchens in Mumbai to withstand the high humidity and direct contact with water without swelling or peeling.' },
    { q: 'Can we inspect the materials before execution begins?', a: 'Absolutely. We practice 100% material transparency. We show you the branded plywood stamps on site and provide genuine hardware invoices from Hettich, Blum, or Hafele.' },
    { q: 'What are your execution timelines for a typical home?', a: 'We believe in honest, transparent timelines rather than rushed promises. While a typical 2BHK flat takes around 50 to 60 days of carpentry and onsite assembly, we never rush the curing of paint or the alignment of hardware to meet a marketing deadline. We keep you updated daily on WhatsApp with photos so you know exactly where work stands.' }
  ];

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">What We Offer</span>
          <h1 className="page-title">
            Services & Property Specialties
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Bespoke cabinetry, space planning, modular setups, and execution standards for Mumbai residences and commercial projects.
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
