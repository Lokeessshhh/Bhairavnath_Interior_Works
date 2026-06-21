import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function Interactive3DLayout() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);     // Pre-extracted frame ImageBitmaps
  const [activeLayer, setActiveLayer] = useState(0);
  const [pinState, setPinState] = useState('top');
  const [sectionWidth, setSectionWidth] = useState('100%');
  const [sectionLeft, setSectionLeft] = useState('0px');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [startPreload, setStartPreload] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartPreload(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px 600px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startPreload) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let cancelled = false;

    // ==========================================
    // STEP 1: Preload all pre-saved frames
    // ==========================================
    const preloadFrames = async () => {
      const isMobile = window.innerWidth < 768;
      const step = isMobile ? 3 : 1; // Load every 3rd frame on mobile (40 frames), full 120 on desktop
      const totalFrames = Math.ceil(120 / step);
      const loadedImages = [];
      let loadedCount = 0;

      // Temporary image to get natural dimensions
      const tempImg = new Image();
      tempImg.src = '/frames/frame_001.webp';
      await new Promise((resolve) => {
        tempImg.onload = () => {
          canvas.width = tempImg.naturalWidth || 960;
          canvas.height = tempImg.naturalHeight || 540;
          resolve();
        };
        tempImg.onerror = () => {
          canvas.width = 960;
          canvas.height = 540;
          resolve();
        };
      });

      const loadPromise = new Promise((resolve) => {
        for (let i = 1; i <= 120; i += step) {
          if (cancelled) return;
          const img = new Image();
          const frameNum = String(i).padStart(3, '0');
          img.src = `/frames/frame_${frameNum}.webp`;
          
          img.onload = () => {
            if (cancelled) return;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
            if (loadedCount === totalFrames) {
              resolve();
            }
          };

          img.onerror = () => {
            if (cancelled) return;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
            if (loadedCount === totalFrames) {
              resolve();
            }
          };

          loadedImages.push(img);
        }
      });

      await loadPromise;
      if (cancelled) return;

      framesRef.current = loadedImages;
      setIsReady(true);

      // Draw first frame
      if (loadedImages.length > 0) {
        ctx.drawImage(loadedImages[0], 0, 0, canvas.width, canvas.height);
      }
    };

    preloadFrames();

    // ==========================================
    // STEP 2: Scroll-driven frame display
    // ==========================================
    // Cache header height once — reading getComputedStyle inside scroll causes forced reflow
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 72;

    const updateDimensions = () => {
      if (cancelled) return;
      setSectionWidth(section.offsetWidth + 'px');
      setSectionLeft(section.getBoundingClientRect().left + 'px');
    };

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableHeight = rect.height - viewportH;

      if (scrollableHeight <= 0) {
        setPinState('top');
        targetProgress = 0;
        setActiveLayer(0);
        return;
      }

      if (rect.top > headerH) {
        setPinState('top');
        targetProgress = 0;
        setActiveLayer(0);
      } else if (rect.bottom <= viewportH) {
        setPinState('bottom');
        targetProgress = 1;
        setActiveLayer(2);
      } else {
        setPinState('fixed');
        const scrolled = -(rect.top - headerH);
        const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        targetProgress = p;

        if (p < 0.33) setActiveLayer(0);
        else if (p < 0.66) setActiveLayer(1);
        else setActiveLayer(2);
      }
    };

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18;
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      // Draw the correct frame
      const frames = framesRef.current;
      if (frames.length > 0) {
        const frameIndex = Math.min(
          frames.length - 1,
          Math.floor(currentProgress * (frames.length - 1))
        );
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
      }

      rafId = requestAnimationFrame(tick);
    };

    // Initialize dimensions and scroll position on load
    updateDimensions();
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    tick();

    const handleResize = () => {
      updateDimensions();
      handleScroll();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      framesRef.current = [];
    };
  }, [startPreload]);

  // JS-controlled pinning styles for the canvas background
  const getCanvasContainerStyle = () => {
    const base = {
      height: 'calc(100vh - var(--header-height, 72px))',
      width: '100%',
      maxWidth: sectionWidth,
    };
    if (pinState === 'fixed') {
      return {
        ...base,
        position: 'fixed',
        top: 'var(--header-height, 72px)',
        left: sectionLeft,
        zIndex: 1,
      };
    }
    if (pinState === 'bottom') {
      return {
        ...base,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
      };
    }
    return {
      ...base,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    };
  };

  return (
    <section ref={sectionRef} className="three-d-layout-section">
      {/* Background Canvas Layer */}
      <div className="three-d-canvas-container" style={getCanvasContainerStyle()}>
        <canvas
          ref={canvasRef}
          className="three-d-viewport-canvas"
        />
        {/* Loading overlay */}
        {!isReady && (
          <div className="three-d-loading-overlay">
            <div style={{
              width: '180px',
              height: '3px',
              backgroundColor: 'var(--color-border)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${loadingProgress}%`,
                height: '100%',
                backgroundColor: 'var(--color-accent)',
                borderRadius: '2px',
                transition: 'width 0.15s ease',
              }} />
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
            }}>
              Loading Experience · {loadingProgress}%
            </span>
          </div>
        )}
      </div>

      {/* Scrolling Text Slides Overlay */}
      <div className="three-d-slides-container container">
        {/* Slide 1 */}
        <div className="three-d-slide">
          <div className="three-d-left-col"></div>
          <div className="three-d-right-col">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span className="section-tag">Interactive Architecture</span>
              <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: '2.25rem' }}>
                How We Execute
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                Scroll to watch our execution model assemble — from empty rooms to fully furnished luxury interiors, piece by piece.
              </p>
            </div>
            <div className={`layer-text-card ${activeLayer === 0 ? 'active' : ''}`} aria-hidden={activeLayer !== 0}>
              <span className="phase-num">Phase 01</span>
              <h3>Living Room Assembly</h3>
              <p>The foundation is set. Wooden flooring slides into place, followed by the sofa, custom TV unit, coffee table, and bookshelf — each piece precision-fitted to the layout.</p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="three-d-slide">
          <div className="three-d-left-col"></div>
          <div className="three-d-right-col">
            <div className={`layer-text-card ${activeLayer === 1 ? 'active' : ''}`} aria-hidden={activeLayer !== 1}>
              <span className="phase-num">Phase 02</span>
              <h3>Modular Kitchen Fit-Out</h3>
              <p>Base cabinets, wall-mounted upper units, stone countertop, and chimney assemble into a fully modular kitchen — built with BWR plywood and Hettich fittings.</p>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="three-d-slide">
          <div className="three-d-left-col"></div>
          <div className="three-d-right-col">
            <div className={`layer-text-card ${activeLayer === 2 ? 'active' : ''}`} aria-hidden={activeLayer !== 2}>
              <span className="phase-num">Phase 03</span>
              <h3>Bedroom & Wardrobe Installation</h3>
              <p>The bedroom comes alive — sliding-door wardrobe, bed frame, side tables, and dresser lock into position. Every module finished with premium laminates and concealed hinges.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
