import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { initialArticles } from '../blogData';

export default function BlogPostPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/journals?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          const mappedData = {
            ...data,
            readTime: data.readTime || data.read_time
          };
          setArticle(mappedData);
        } else {
          const match = initialArticles.find((a) => a.id === id);
          setArticle(match || null);
        }
      } catch (err) {
        console.error('Error loading article:', err);
        const match = initialArticles.find((a) => a.id === id);
        setArticle(match || null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Bhairavnath Interiors`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", article.description || "Read articles and guides on interior design and modular carpentry on Bhairavnath Interiors blog.");
      }
    }
  }, [article]);

  // Simple Markdown Parser utility for content lines
  const parseMarkdown = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      // Handle Headings (###)
      if (trimmed.startsWith('###')) {
        return (
          <h3 
            key={index} 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.6rem', 
              fontWeight: '400', 
              color: 'var(--color-text-primary)',
              marginTop: '2.5rem',
              marginBottom: '1rem' 
            }}
          >
            {trimmed.replace(/^###\s*/, '')}
          </h3>
        );
      }

      // Handle Bullet Points (-)
      if (trimmed.startsWith('-')) {
        return (
          <li 
            key={index} 
            style={{ 
              fontSize: '1.05rem', 
              color: 'var(--color-text-secondary)', 
              lineHeight: '1.75',
              marginLeft: '2rem',
              listStyleType: 'square',
              marginBottom: '0.5rem'
            }}
          >
            {trimmed.replace(/^-\s*/, '')}
          </li>
        );
      }

      // Handle Regular Paragraphs
      return (
        <p 
          key={index} 
          style={{ 
            fontSize: '1.05rem', 
            color: 'var(--color-text-secondary)', 
            lineHeight: '1.8',
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '8rem 0', textAlign: 'center', backgroundColor: 'var(--color-bg-primary)' }}>
        <p>Loading article details...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <main style={{ paddingTop: 'calc(var(--header-height) + 4rem)', backgroundColor: 'var(--color-bg-primary)', minHeight: '80vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Article Not Found</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
            The article you are looking for does not exist or has been deleted.
          </p>
          <Link to="/blog" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Back to Journal
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 'calc(var(--header-height) + 2rem)', backgroundColor: 'var(--color-bg-primary)', paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        {/* Back Link */}
        <Link 
          to="/blog" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-text-secondary)',
            marginBottom: '3rem',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>

        {/* Article Header */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '1rem' }}>
            <span>{article.category}</span>
            <span style={{ color: 'var(--color-border)', fontWeight: '300' }}>|</span>
            <span style={{ color: 'var(--color-text-secondary)', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>

          <h1 className="page-title" style={{ fontSize: '2.75rem', lineHeight: '1.3' }}>
            {article.title}
          </h1>
        </header>

        {/* Feature Image Banner */}
        <div 
          style={{
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
            marginBottom: '4rem'
          }}
        >
          <img 
            src={article.image} 
            alt={article.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Parse & Render Content */}
        <div style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
          {parseMarkdown(article.content)}
        </div>

        {/* Bottom divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4rem 0' }} />

        {/* Bottom Back Trigger */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/blog" className="btn-secondary" style={{ padding: '0.85rem 2.5rem' }}>
            View All Articles
          </Link>
        </div>

      </div>
    </main>
  );
}
