import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lock, PlusCircle } from 'lucide-react';
import { initialArticles } from '../blogData';

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Admin form state
  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Material Care',
    description: '',
    content: '',
    image: '',
    readTime: '5 min read'
  });

  // Client story state
  const [clientStory, setClientStory] = useState({ name: '', title: '', story: '' });
  const [clientStorySuccess, setClientStorySuccess] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/journals');
      if (res.ok) {
        const data = await res.json();
        setArticles(data.length > 0 ? data : initialArticles);
      } else {
        setArticles(initialArticles);
      }
    } catch (e) {
      console.error('Error fetching articles:', e);
      setArticles(initialArticles);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAdminPublish = async (e) => {
    e.preventDefault();
    if (adminPassword !== 'admin123') {
      setAdminError('Incorrect administrator password.');
      setAdminSuccess('');
      return;
    }

    if (!selectedFile) {
      setAdminError('Please select a cover image file to upload.');
      return;
    }

    setAdminError('');
    setAdminSuccess('');
    setIsSubmitting(true);

    try {
      // Step 1: Request upload signature from Vercel function
      const sigRes = await fetch('/api/upload-signature', { method: 'POST' });
      if (!sigRes.ok) {
        throw new Error('Failed to obtain secure upload signature.');
      }
      const { signature, timestamp, cloudName, apiKey, folder } = await sigRes.json();

      // Step 2: Upload image directly to Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', folder);

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!cloudRes.ok) {
        throw new Error('Image upload to Cloudinary failed.');
      }
      const cloudData = await cloudRes.json();
      const imageUrl = cloudData.secure_url;

      // Step 3: POST post details to serverless journals API
      const slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const createdPost = {
        id: slug,
        category: newPost.category,
        title: newPost.title,
        description: newPost.description,
        image: imageUrl,
        readTime: newPost.readTime || '5 min read',
        content: newPost.content
      };

      const res = await fetch('/api/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdPost)
      });

      if (res.ok) {
        setAdminSuccess('Article published successfully!');
        setIsAdminOpen(false);
        setAdminPassword('');
        setSelectedFile(null);
        setNewPost({
          title: '',
          category: 'Material Care',
          description: '',
          content: '',
          image: '',
          readTime: '5 min read'
        });
        await fetchArticles();
      } else {
        const data = await res.json();
        setAdminError(data.error || 'Failed to save article.');
      }
    } catch (err) {
      console.error(err);
      setAdminError(err.message || 'Server error occurred while publishing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/journals?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        await fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete article.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while deleting article.');
    }
  };

  const handleClientStorySubmit = (e) => {
    e.preventDefault();
    if (clientStory.name && clientStory.story) {
      // Mock upload (store in a mock list or just clear)
      setClientStorySuccess(true);
      setClientStory({ name: '', title: '', story: '' });
    }
  };

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Nesta Journal</span>
          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '3.5rem', 
              fontWeight: '400', 
              color: 'var(--color-text-primary)',
              lineHeight: '1.2',
              marginBottom: '1.5rem'
            }}
          >
            Mumbai Interior Insights
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Material guides, space-saving layout tips, and wood conservation practices for Mumbai homeowners.
          </p>
          <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* Main Articles List & Forms grid */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '5rem',
              alignItems: 'flex-start'
            }}
          >
            {/* Left: Articles List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: '400' }}>
                  Latest Articles
                </h2>
                
                {/* Admin toggle link */}
                <button
                  onClick={() => setIsAdminOpen(!isAdminOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-accent)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Lock size={12} />
                  Admin Publish Desk
                </button>
              </div>

              {/* Admin Panel Form Dropdown */}
              {isAdminOpen && (
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-accent)', padding: '2.5rem', marginBottom: '2rem' }}>
                  <form onSubmit={handleAdminPublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <PlusCircle size={20} style={{ color: 'var(--color-accent)' }} />
                      Publish New Article
                    </h3>

                    {adminError && <div style={{ color: 'red', fontSize: '0.85rem' }}>{adminError}</div>}

                    {/* Title */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Title *</label>
                      <input 
                        type="text" 
                        required
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter article title"
                        style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none' }}
                      />
                    </div>

                    {/* Category */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Category</label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none' }}
                      >
                        <option value="Material Care">Material Care</option>
                        <option value="Space Planning">Space Planning</option>
                        <option value="Design Principles">Design Principles</option>
                        <option value="Material Curation">Material Curation</option>
                        <option value="Styling & Decor">Styling & Decor</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Short Description *</label>
                      <input 
                        type="text" 
                        required
                        value={newPost.description}
                        onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter 1-sentence description"
                        style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none' }}
                      />
                    </div>

                    {/* Full Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Full Content (supports formatting) *</label>
                      <textarea 
                        required
                        rows="6"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Enter full article text..."
                        style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', resize: 'none' }}
                      />
                    </div>

                    {/* Cover Image Upload */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Cover Image *</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        required
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', color: 'var(--color-text-primary)' }}
                      />
                    </div>

                    {/* Password */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Admin Password *</label>
                      <input 
                        type="password" 
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Enter password (hint: admin123)"
                        style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isSubmitting}
                      style={{ padding: '0.85rem', fontSize: '0.8rem', letterSpacing: '0.05em', marginTop: '0.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                      {isSubmitting ? 'Uploading & Publishing...' : 'Publish Article'}
                    </button>
                  </form>
                </div>
              )}

              {adminSuccess && (
                <div style={{ border: '1px solid green', backgroundColor: '#e6ffe6', color: 'green', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {adminSuccess}
                </div>
              )}

              {/* Grid Cards list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {articles.map(article => (
                  <article 
                    key={article.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 2fr',
                      gap: '2rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      padding: '1.5rem',
                      alignItems: 'center'
                    }}
                  >
                    {/* Image */}
                    <div style={{ height: '200px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Meta info */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        <span>{article.category}</span>
                        <span style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>{article.readTime}</span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                        {article.title}
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        {article.description}
                      </p>

                      {/* Actions Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        {/* Route Link */}
                        <Link 
                          to={`/blog/${article.id}`}
                          className="btn-link"
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          Read Full Article
                          <ArrowRight size={14} />
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#e53e3e',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(229, 62, 62, 0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Client Story Submission Form */}
            <div 
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                padding: '4rem 3.5rem',
                boxShadow: '0 20px 45px rgba(28, 25, 23, 0.02)',
                position: 'sticky',
                top: 'calc(var(--header-height) + 2rem)'
              }}
            >
              {!clientStorySuccess ? (
                <form onSubmit={handleClientStorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={22} style={{ color: 'var(--color-accent)' }} />
                    Submit Your Story
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
                    Are you a Bhairavnath client? Share your experience with modular installations or custom renovations to be featured in our client stories section.
                  </p>

                  {/* Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Your Name *</label>
                    <input 
                      type="text" 
                      required
                      value={clientStory.name}
                      onChange={(e) => setClientStory(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                      style={{ padding: '0.85rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', fontSize: '0.9rem' }}
                    />
                  </div>

                  {/* Story Title */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Story Title *</label>
                    <input 
                      type="text" 
                      required
                      value={clientStory.title}
                      onChange={(e) => setClientStory(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. My 2BHK Renovation in Prabhadevi"
                      style={{ padding: '0.85rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', fontSize: '0.9rem' }}
                    />
                  </div>

                  {/* Story Text */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Your Story *</label>
                    <textarea 
                      required
                      rows="5"
                      value={clientStory.story}
                      onChange={(e) => setClientStory(prev => ({ ...prev, story: e.target.value }))}
                      placeholder="Write your home interior journey..."
                      style={{ padding: '0.85rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', outline: 'none', resize: 'none', fontSize: '0.9rem', lineHeight: '1.5' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: '1rem', fontSize: '0.8rem', letterSpacing: '0.08em', marginTop: '0.5rem' }}>
                    Submit Home Story
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.25rem' }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                    Story Registered
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', maxWidth: '300px', margin: '0 auto 2rem' }}>
                    Thank you! Your story has been successfully registered. It will be reviewed by Roshanlal before publication.
                  </p>
                  <button 
                    onClick={() => setClientStorySuccess(false)}
                    className="btn-secondary"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}
                  >
                    Submit Another Story
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
