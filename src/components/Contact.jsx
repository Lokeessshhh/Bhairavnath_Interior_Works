import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Renovation',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.phone) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        setSubmitError(data.error || 'Failed to submit request.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to connect to serverless API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="grid-split-about">
          {/* Left: Contact Info */}
          <div>
            <span className="section-tag">Contact Us</span>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>
              Let’s Create Something <br />Extraordinary Together
            </h2>
            <p 
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.75',
                marginBottom: '3rem',
                maxWidth: '480px'
              }}
            >
              Have a project in mind, or want to redesign your existing home? Reach out to schedule a complimentary design consultation at our studio or online.
            </p>

            {/* Info details list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-accent)', marginTop: '4px' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Our Service Area</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', maxWidth: '300px' }}>
                    Based in Mumbai, Serving All Over Mumbai, MH
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-accent)', marginTop: '4px' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Call & WhatsApp</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>+91 77383 37299</p>
                  <a 
                    href="https://wa.me/917738337299?text=Hello%20Bhairavnath%20Interior%20Works,%20I%20would%20like%20to%20inquire%20about%20a%20design%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      letterSpacing: '0.05em',
                      color: 'var(--color-accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      paddingBottom: '2px'
                    }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-accent)', marginTop: '4px' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Email Us</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>roshanlohar80@gmail.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-accent)', marginTop: '4px' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Business Hours</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form Container */}
          <div 
            className="contact-form-container"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 20px 45px rgba(28, 25, 23, 0.03)'
            }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <h3 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    fontWeight: '400',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Book a Consultation
                </h3>

                {submitError && <div style={{ color: 'red', fontSize: '0.85rem' }}>{submitError}</div>}
                
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Your Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="email" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Your Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                {/* Phone Number */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="phone" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                {/* Service */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="service" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Service Required</label>
                  <select 
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleInputChange}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  >
                    <option value="Renovation">Renovation</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom Wardrobes">Bedroom Wardrobes</option>
                    <option value="Interior Design">Full-Service Interior Design</option>
                    <option value="Space Planning">Space Layout & Planning</option>
                    <option value="Custom Furniture">Custom Carpentry & Furniture</option>
                    <option value="Styling">Styling & Decor Curation</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="message" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Project Details</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="4"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your space (rooms, size, goals...)"
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      resize: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{
                    padding: '1.1rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    width: '100%',
                    marginTop: '0.5rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Consultation Request'}
                </button>
              </form>
            ) : (
              <div 
                className="animate-fade-in"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '3rem 1rem'
                }}
              >
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent)',
                    marginBottom: '1.5rem',
                    fontSize: '1.5rem'
                  }}
                >
                  ✓
                </div>
                <h3 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem'
                  }}
                >
                  Request Received
                </h3>
                <p 
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                    maxWidth: '320px',
                    marginBottom: '2rem'
                  }}
                >
                  Thank you, {formState.name.split(' ')[0]}. We have registered your request. Our principal designer will contact you via email within 24 business hours to book your slot.
                </p>
                <button 
                 onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', phone: '', service: 'Renovation', message: '' });
                  }}
                  className="btn-secondary"
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.8rem'
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
