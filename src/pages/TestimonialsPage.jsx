import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ name: '', role: '', comment: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (e) {
      console.error('Error fetching reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.comment) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          role: formState.role || 'Client',
          rating: formState.rating,
          comment: formState.comment
        })
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', role: '', comment: '', rating: 5 });
        await fetchReviews();
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

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Client Feedback</span>
          <h1 className="page-title">
            Client Reviews & Testimonials
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Hear from families and business owners across Mumbai who entrusted Bhairavnath Interior Works with their spaces.
          </p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* Review grid and form split */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div className="grid-split-2">
            {/* Left: Reviews Wall */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: '400', marginBottom: '1rem' }}>
                Verified Handover Stories
              </h2>

              {/* Approved Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <div 
                      key={index}
                      className="skeleton-pulsing"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '0.5rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} style={{ width: '18px', height: '18px', backgroundColor: 'var(--color-border)', borderRadius: '50%' }} />
                        ))}
                      </div>
                      <div style={{ height: '1.2rem', backgroundColor: 'var(--color-border)', width: '90%', borderRadius: '4px' }} />
                      <div style={{ height: '1.2rem', backgroundColor: 'var(--color-border)', width: '75%', borderRadius: '4px', marginBottom: '1rem' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                          <div style={{ height: '0.9rem', backgroundColor: 'var(--color-border)', width: '40%', borderRadius: '4px' }} />
                          <div style={{ height: '0.78rem', backgroundColor: 'var(--color-border)', width: '25%', borderRadius: '4px' }} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : reviews.length === 0 ? (
                  <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                      "No client reviews have been published yet. Be the first to share your experience with our craftsmanship!"
                    </p>
                  </div>
                ) : (
                  reviews.map((review, index) => {
                    const avatarUrl = review.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=1c1917&color=faf9f6&size=128`;
                    return (
                      <div 
                        key={index}
                        style={{
                          backgroundColor: 'var(--color-bg-secondary)',
                          border: '1px solid var(--color-border)',
                          padding: '3rem',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '4px', color: 'var(--color-accent)', marginBottom: '1.5rem' }}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" stroke="none" />
                          ))}
                        </div>

                        <p 
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.15rem',
                            lineHeight: '1.65',
                            color: 'var(--color-text-primary)',
                            marginBottom: '2rem'
                          }}
                        >
                          "{review.comment}"
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img 
                            src={avatarUrl} 
                            alt={review.name} 
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1px solid var(--color-border)'
                            }}
                          />
                          <div>
                            <cite style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', fontStyle: 'normal', display: 'block' }}>
                              {review.name}
                            </cite>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', letterSpacing: '0.02em' }}>
                              {review.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Review Form */}
            <div 
              className="contact-form-container"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 45px rgba(28, 25, 23, 0.02)',
                position: 'sticky',
                top: 'calc(var(--header-height) + 2rem)'
              }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '400', marginBottom: '0.25rem' }}>
                    Share Your Experience
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                    Submit a review below to publish it directly on the wall and the homepage slider.
                  </p>

                  {submitError && <div style={{ color: 'red', fontSize: '0.85rem' }}>{submitError}</div>}

                  {/* Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Your Name *</label>
                    <input 
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                      style={{ padding: '0.85rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', fontSize: '0.9rem' }}
                    />
                  </div>

                  {/* Role */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Role / Project Location</label>
                    <input 
                      type="text"
                      value={formState.role}
                      onChange={(e) => setFormState(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Homeowner, Dadar"
                      style={{ padding: '0.85rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', fontSize: '0.9rem' }}
                    />
                  </div>

                  {/* Interactive Stars Rating */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Rating *</label>
                    <div style={{ display: 'flex', gap: '8px', color: 'var(--color-accent)' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, rating: star }))}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'inherit' }}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star 
                            size={26} 
                            fill={(hoverRating || formState.rating) >= star ? 'currentColor' : 'none'} 
                            stroke="currentColor" 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Comment *</label>
                    <textarea 
                      required
                      rows="4"
                      value={formState.comment}
                      onChange={(e) => setFormState(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Tell us about modular quality, carpentry alignments, timeline delivery..."
                      style={{ padding: '0.85rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', resize: 'none', fontSize: '0.9rem', lineHeight: '1.5' }}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{ padding: '1rem', fontSize: '0.8rem', letterSpacing: '0.08em', marginTop: '0.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.25rem' }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                    Review Published
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', maxWidth: '300px', margin: '0 auto 2rem' }}>
                    Thank you! Your feedback has been registered and is now published directly on the wall and the homepage slider!
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}
                  >
                    Add Another Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
