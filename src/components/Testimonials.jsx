import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({ name: '', role: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      } else {
        setTestimonials([]);
      }
    } catch (e) {
      console.error('Error fetching testimonials:', e);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormState({ name: '', role: '', rating: 5, comment: '' });
        setShowForm(false);
        await fetchTestimonials();
        setCurrentIndex(0);
      } else {
        const data = await res.json();
        setSubmitError(data.error || 'Failed to submit review.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to connect to serverless API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading client reviews...</p>
        </div>
      </section>
    );
  }

  const hasTestimonials = testimonials.length > 0;
  const current = hasTestimonials ? testimonials[currentIndex] : null;
  const avatarUrl = current ? (current.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=1c1917&color=faf9f6&size=128`) : '';

  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">What Our Clients Say</h2>
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
          className="testimonial-card-wrapper"
          style={{
            maxWidth: '850px',
            margin: '0 auto 3rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            position: 'relative',
            boxShadow: '0 15px 30px rgba(28, 25, 23, 0.02)'
          }}
        >
          {!hasTestimonials ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <p style={{ 
                fontSize: '1.15rem', 
                color: 'var(--color-text-secondary)', 
                fontFamily: 'var(--font-serif)',
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>
                "No client reviews have been published yet. Be the first to share your experience with our craftsmanship!"
              </p>
            </div>
          ) : (
            <>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '4px',
                  color: 'var(--color-accent)',
                  marginBottom: '2rem'
                }}
              >
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" stroke="none" />
                ))}
              </div>

              <blockquote 
                className="animate-fade-in"
                key={currentIndex}
                style={{
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: '1.7',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: '2.5rem'
                }}
              >
                "{current.comment}"
              </blockquote>

              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <img 
                  src={avatarUrl} 
                  alt={current.name} 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--color-border)'
                  }}
                />
                
                <div style={{ textAlign: 'center' }}>
                  <cite 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      fontStyle: 'normal',
                      display: 'block'
                    }}
                  >
                    {current.name}
                  </cite>
                  <span 
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-secondary)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {current.role}
                  </span>
                </div>
              </div>

              {testimonials.length > 1 && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 1.5rem',
                    pointerEvents: 'none',
                    width: '100%'
                  }}
                >
                  <button 
                    onClick={handlePrev}
                    aria-label="Previous Testimonial"
                    style={{
                      background: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'var(--transition-fast)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={handleNext}
                    aria-label="Next Testimonial"
                    style={{
                      background: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'var(--transition-fast)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-secondary"
            style={{ padding: '0.75rem 2rem', fontSize: '0.8rem' }}
          >
            {showForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {showForm && (
          <div 
            style={{
              maxWidth: '600px',
              margin: '0 auto 2rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              padding: '2.5rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
              borderRadius: '4px'
            }}
          >
            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '400', margin: '0 0 0.5rem 0' }}>
                Share Your Experience
              </h3>

              {submitError && <div style={{ color: 'red', fontSize: '0.85rem' }}>{submitError}</div>}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Anand Iyer"
                  style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Role / Project Location</label>
                <input 
                  type="text" 
                  value={formState.role}
                  onChange={(e) => setFormState(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g. Homeowner, Dadar"
                  style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Rating *</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, rating: star }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star 
                        size={22} 
                        fill={star <= formState.rating ? 'var(--color-accent)' : 'none'} 
                        stroke={star <= formState.rating ? 'none' : 'var(--color-text-secondary)'} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Review *</label>
                <textarea 
                  required
                  rows="4"
                  value={formState.comment}
                  onChange={(e) => setFormState(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="How was the modular finish, timing, and principal guidance?"
                  style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', resize: 'none' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={isSubmitting}
                style={{ padding: '0.85rem', fontSize: '0.8rem', letterSpacing: '0.05em', marginTop: '0.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {submitSuccess && (
          <div style={{ maxWidth: '600px', margin: '0 auto 2rem', border: '1px solid green', backgroundColor: '#e6ffe6', color: 'green', padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
            Thank you! Your review was successfully published and added to the slider!
          </div>
        )}
      </div>
    </section>
  );
}
