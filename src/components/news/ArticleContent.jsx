import './ArticleContent.css';

export default function ArticleContent({ article }) {
  return (
    <section className="article-content section" aria-label="Article Content">
      <div className="container">
        <div className="article-content__col">
          <p className="article-content__excerpt">{article.excerpt}</p>

          {article.content.map((block, i) => {
            if (block.type === 'heading') {
              return <h2 key={i} className="article-content__heading">{block.text}</h2>;
            }
            if (block.type === 'pullquote') {
              return (
                <blockquote key={i} className="article-content__pullquote">
                  <p>{block.text}</p>
                  {block.attribution && <cite>{block.attribution}</cite>}
                </blockquote>
              );
            }
            if (block.type === 'image') {
              return (
                <figure key={i} className="article-content__figure">
                  <img src={block.url} alt={block.caption || ''} loading="lazy" />
                  {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
              );
            }
            return <p key={i} className="article-content__p">{block.text}</p>;
          })}
        </div>
      </div>
    </section>
  );
}
