import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Newspaper } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getArticleBySlug } from '../data/news';
import ArticleHero from '../components/news/ArticleHero';
import ArticleContent from '../components/news/ArticleContent';
import ArticleGallery from '../components/news/ArticleGallery';
import ArticleReferences from '../components/news/ArticleReferences';
import RelatedArticles from '../components/news/RelatedArticles';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = article
      ? `${article.title} — Blue Ocean Somalia`
      : 'Story Not Found — Blue Ocean Somalia';
  }, [article]);

  if (!article) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Newspaper size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Story Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The story you are looking for is not currently published. Explore our full story archive.
          </p>
          <Link to="/news/articles" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to All Stories</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="article-detail-page" aria-label={article.title}>
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <ArticleGallery article={article} />
      <ArticleReferences article={article} />
      <RelatedArticles currentSlug={article.slug} />
      <GetInvolvedCTA />
    </main>
  );
}
