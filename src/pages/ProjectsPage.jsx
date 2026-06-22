import React, { useState, useEffect, useRef, useMemo } from 'react';
import initialProjects from '../data/initialProjects.json';

const getOptimizedUrl = (url, width = 800) => {
  if (!url) return url;
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto:eco,w_${width}/`);
  }
  if (url.includes('images.unsplash.com')) {
    let optimized = url;
    if (url.includes('w=')) {
      optimized = optimized.replace(/w=\d+/, `w=${width}`);
    } else {
      optimized += `&w=${width}`;
    }
    if (url.includes('q=')) {
      optimized = optimized.replace(/q=\d+/, `q=60`);
    } else {
      optimized += `&q=60`;
    }
    if (!url.includes('fm=')) {
      optimized += `&fm=webp`;
    }
    return optimized;
  }
  return url;
};

function EagerBentoItem({ project, gridStyle }) {
  return (
    <div 
      className="bento-item eager"
      style={{
        ...gridStyle,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.01)',
        backgroundColor: 'var(--color-bg-primary)',
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector('.bento-img');
        const overlay = e.currentTarget.querySelector('.bento-overlay');
        if (img) img.style.transform = 'scale(1.05)';
        if (overlay) overlay.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector('.bento-img');
        const overlay = e.currentTarget.querySelector('.bento-overlay');
        if (img) img.style.transform = 'scale(1.0)';
        if (overlay) overlay.style.opacity = 0;
      }}
    >
      <picture style={{ width: '100%', height: '100%' }}>
        <source media="(max-width: 768px)" srcSet={getOptimizedUrl(project.image, 400)} />
        <source media="(min-width: 769px)" srcSet={getOptimizedUrl(project.image, project.size === 'wide' ? 800 : project.size === 'tall' ? 600 : 400)} />
        <img 
          src={getOptimizedUrl(project.image, 400)} 
          alt={project.title} 
          className="bento-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'var(--transition-smooth)'
          }}
          loading="lazy"
        />
      </picture>
      <div 
        className="bento-overlay"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '1.5rem',
          background: 'linear-gradient(to top, rgba(28, 25, 23, 0.8) 0%, rgba(28, 25, 23, 0) 100%)',
          color: '#FFFFFF',
          opacity: 0,
          transition: 'var(--transition-fast)'
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>
          {project.category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: '400', marginTop: '0.25rem', color: '#FFFFFF' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
          {project.description}
        </p>
      </div>
    </div>
  );
}

function LazyBentoItem({ project, gridStyle }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setTimeout(() => setRevealed(true), 50);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`bento-item ${revealed ? 'revealed' : ''}`}
      style={{
        ...gridStyle,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.01)',
        backgroundColor: 'var(--color-bg-primary)',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={isIntersecting ? (e) => {
        const img = e.currentTarget.querySelector('.bento-img');
        const overlay = e.currentTarget.querySelector('.bento-overlay');
        if (img) img.style.transform = 'scale(1.05)';
        if (overlay) overlay.style.opacity = 1;
      } : undefined}
      onMouseLeave={isIntersecting ? (e) => {
        const img = e.currentTarget.querySelector('.bento-img');
        const overlay = e.currentTarget.querySelector('.bento-overlay');
        if (img) img.style.transform = 'scale(1.0)';
        if (overlay) overlay.style.opacity = 0;
      } : undefined}
    >
      {isIntersecting ? (
        <>
          <picture style={{ width: '100%', height: '100%' }}>
            <source media="(max-width: 768px)" srcSet={getOptimizedUrl(project.image, 400)} />
            <source media="(min-width: 769px)" srcSet={getOptimizedUrl(project.image, project.size === 'wide' ? 800 : project.size === 'tall' ? 600 : 400)} />
            <img 
              src={getOptimizedUrl(project.image, 400)} 
              alt={project.title} 
              className="bento-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'var(--transition-smooth)'
              }}
              loading="lazy"
            />
          </picture>
          <div 
            className="bento-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(28, 25, 23, 0.8) 0%, rgba(28, 25, 23, 0) 100%)',
              color: '#FFFFFF',
              opacity: 0,
              transition: 'var(--transition-fast)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>
              {project.category}
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: '400', marginTop: '0.25rem', color: '#FFFFFF' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
              {project.description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

const BeforeAfterSlider = React.memo(() => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(950);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleSliderChange = (e) => {
    setSliderPos(e.target.value);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/10',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.06)',
        userSelect: 'none'
      }}
    >
      {/* BEFORE image (Back layer) */}
      <picture style={{ width: '100%', height: '100%' }}>
        <source media="(max-width: 768px)" srcSet={getOptimizedUrl("https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1200", 600)} />
        <source media="(min-width: 769px)" srcSet={getOptimizedUrl("https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1200", 1200)} />
        <img 
          src={getOptimizedUrl("https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1200", 600)} 
          alt="Raw site under construction before" 
          fetchPriority="high"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />
      </picture>

      {/* AFTER image (Overlay sliding layer) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${sliderPos}%`,
          overflow: 'hidden',
          transition: 'width 0.05s ease-out'
        }}
      >
        <picture 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${containerWidth}px`,
            height: '100%'
          }}
        >
          <source media="(max-width: 768px)" srcSet={getOptimizedUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", 600)} />
          <source media="(min-width: 769px)" srcSet={getOptimizedUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", 1200)} />
          <img 
            src={getOptimizedUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", 600)} 
            alt="Completed modular kitchen handover after" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
          />
        </picture>
      </div>

      {/* Drag Line Indicator */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPos}%`,
          width: '2px',
          backgroundColor: '#FFFFFF',
          zIndex: 10,
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          transition: 'left 0.05s ease-out'
        }}
      >
        {/* Circular handle badge */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: 'var(--color-text-primary)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '1px'
          }}
        >
          ↔
        </div>
      </div>

      {/* HTML Slider Control overlay */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos}
        onChange={handleSliderChange}
        aria-label="Before and after comparison slider"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'ew-resize',
          zIndex: 20
        }}
      />

      {/* Visual Tags */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#FFFFFF', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 15 }}>
        Raw Site
      </div>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: 'rgba(194, 159, 104, 0.95)', color: '#FFFFFF', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 15 }}>
        Bhairavnath Handover
      </div>
    </div>
  );
});

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(18);

  // Staggered scroll reveal triggers for Bento items
  useEffect(() => {
    const bentoItems = document.querySelectorAll('.bento-item.eager');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            const visibleEagerItems = Array.from(document.querySelectorAll('.bento-item.eager'));
            const idx = visibleEagerItems.indexOf(entry.target);
            // Apply staggered delays
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, (idx % 6) * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    bentoItems.forEach((item) => observer.observe(item));
    return () => bentoItems.forEach((item) => observer.unobserve(item));
  }, [activeFilter, visibleCount]);

  const [allProjects, setAllProjects] = useState(null);

  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setAllProjects(data);
      })
      .catch(err => {
        console.error('Failed to load full projects database:', err);
      });
  }, []);

  const projectsData = allProjects || initialProjects;

  // Derived filter categories from the actual Cloudinary sync data
  const categories = useMemo(() => {
    return ['All', ...new Set(projectsData.map(p => p.category))];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    return projectsData.filter(p => p.category === activeFilter);
  }, [projectsData, activeFilter]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Showcase</span>
          <h1 className="page-title">
            Spaces We Have Created
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Browse through our residential carpentry contracts, modular fittings, and commercial turnkey setups across Mumbai.
          </p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* Before / After Slider Section */}
      <section style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '950px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: '400', marginBottom: '0.75rem' }}>
              Drag to Compare: Site vs. Handover
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              See how we coordinate raw construction sites into final, premium quiet luxury interiors.
            </p>
          </div>

          {/* Interactive Before/After Component */}
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Bento Grid Portfolio */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          {/* Filtering Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span className="section-tag">Gallery</span>
              <h2 className="section-title" style={{ margin: 0 }}>Filter Projects ({filteredProjects.length} items)</h2>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {categories.map(filter => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setVisibleCount(18); // Reset pagination view limit on filter swap
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    color: activeFilter === filter ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                    position: 'relative'
                  }}
                >
                  {filter}
                  {activeFilter === filter && (
                    <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: 'var(--color-accent)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid Layout wrapper */}
          <div className="bento-grid">
            {displayedProjects.map((project, index) => {
              // Map bento sizes to grid column/row spans
              let gridStyle = {};
              if (project.size === 'wide') {
                gridStyle = { gridColumn: 'span 2', gridRow: 'span 1' };
              } else if (project.size === 'tall') {
                gridStyle = { gridColumn: 'span 1', gridRow: 'span 2' };
              } else {
                gridStyle = { gridColumn: 'span 1', gridRow: 'span 1' };
              }

              if (index < 6) {
                return (
                  <EagerBentoItem 
                    key={project.id} 
                    project={project} 
                    gridStyle={gridStyle} 
                  />
                );
              } else {
                return (
                  <LazyBentoItem 
                    key={project.id} 
                    project={project} 
                    gridStyle={gridStyle} 
                  />
                );
              }
            })}
          </div>

          {/* Load More Button */}
          {filteredProjects.length > visibleCount && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
              <button
                onClick={() => setVisibleCount(prev => prev + 18)}
                className="btn-primary"
                style={{ padding: '1rem 3rem' }}
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
