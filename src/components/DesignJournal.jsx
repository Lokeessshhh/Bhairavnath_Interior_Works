import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { initialArticles } from '../blogData';

const optimizeUnsplashUrl = (url, width) => {
  if (!url || !url.includes('images.unsplash.com')) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('q', '50');
    if (width) {
      urlObj.searchParams.set('w', String(width));
    }
    return urlObj.toString();
  } catch (e) {
    return url;
  }
};

const getUnsplashSrcSet = (url) => {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  return `${optimizeUnsplashUrl(url, 400)} 400w, ${optimizeUnsplashUrl(url, 800)} 800w`;
};

export default function DesignJournal() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/journals');
        if (res.ok) {
          const data = await res.json();
          const mappedData = data.map(item => ({
            ...item,
            readTime: item.readTime || item.read_time
          }));
          setArticles((mappedData.length > 0 ? mappedData : initialArticles).slice(0, 3));
        } else {
          setArticles(initialArticles.slice(0, 3));
        }
      } catch (e) {
        console.error('Error fetching home journals:', e);
        setArticles(initialArticles.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container">
        {/* Header Block */}
        <div 
          style={{ 
            textAlign: 'center', 
            marginBottom: '4.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <span className="section-tag">Design Insights</span>
          <h2 className="section-title" style={{ margin: 0, marginBottom: '0.5rem' }}>
            The Nesta Journal
          </h2>
          <p style={{ color: '#5C5652', fontSize: '0.95rem', maxWidth: '480px', marginTop: '0.5rem' }}>
            Read our thoughts on premium carpentry, material curation, and architectural layouts.
          </p>
          <div 
            style={{
              width: '50px',
              height: '1px',
              backgroundColor: 'var(--color-accent)',
              marginTop: '1.25rem'
            }}
          />
        </div>

        {/* Articles Grid */}
        <div className="grid-3-col">
          {articles.map(article => (
            <Link 
              to={`/blog/${article.id}`}
              key={article.id}
              className="journal-card"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 15px 30px rgba(28, 25, 23, 0.02)',
                transition: 'var(--transition-smooth)',
                cursor: 'pointer',
                color: 'inherit',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                const img = e.currentTarget.querySelector('.journal-img');
                if (img) img.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                const img = e.currentTarget.querySelector('.journal-img');
                if (img) img.style.transform = 'scale(1.0)';
              }}
            >
              {/* Image Container */}
              <div 
                style={{
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  position: 'relative',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <img 
                  src={optimizeUnsplashUrl(article.image, 800)} 
                  srcSet={getUnsplashSrcSet(article.image)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={article.title}
                  className="journal-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'var(--transition-smooth)'
                  }}
                  loading="lazy"
                />
              </div>

              {/* Content Panel */}
              <div 
                style={{
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flexGrow: 1
                }}
              >
                {/* Meta details */}
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#856839',
                    marginBottom: '1rem'
                  }}
                >
                  <span>{article.category}</span>
                  <span style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>{article.readTime}</span>
                </div>

                <h3 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: '400',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                    lineHeight: '1.3'
                  }}
                >
                  {article.title}
                </h3>

                <p 
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '1.75rem',
                    flexGrow: 1
                  }}
                >
                  {article.description}
                </p>

                <span 
                  className="btn-link"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    paddingBottom: '2px'
                  }}
                >
                  Read Article
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
