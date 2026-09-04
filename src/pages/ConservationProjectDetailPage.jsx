import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useScrollReveal } from '../lib/hooks';
import { getConservationProjectBySlug } from '../data/conservation';
import { useLanguage } from '../context/LanguageContext';
import ConservationProjectHero from '../components/conservation/ConservationProjectHero';
import ConservationStory from '../components/conservation/ConservationStory';
import ConservationProblem from '../components/conservation/ConservationProblem';
import ConservationApproach from '../components/conservation/ConservationApproach';
import ConservationResearchConnection from '../components/conservation/ConservationResearchConnection';
import ConservationSpeciesConnection from '../components/conservation/ConservationSpeciesConnection';
import ConservationCoastConnection from '../components/conservation/ConservationCoastConnection';
import ConservationCommunityConnection from '../components/conservation/ConservationCommunityConnection';
import RelatedConservation from '../components/conservation/RelatedConservation';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import VideoEmbed from '../components/shared/VideoEmbed';

export default function ConservationProjectDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const project = getConservationProjectBySlug(slug, language);
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = project
      ? `${project.title} — Blue Ocean Conservation`
      : 'Conservation Project Not Found — Blue Ocean Somalia';
  }, [project]);

  if (!project) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Shield size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Conservation Project Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The conservation project you are looking for is not currently published. Explore our full conservation
            directory.
          </p>
          <Link to="/conservation/projects" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to Conservation Projects</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="conservation-project-detail-page" aria-label={`Conservation Project: ${project.title}`}>
      <ConservationProjectHero project={project} />
      {project.videoUrl && (
        <section className="section container" style={{ maxWidth: 900, margin: '0 auto' }}>
          <VideoEmbed
            url={project.videoUrl}
            title={project.title}
            videoTitle={project.videoTitle}
            videoDescription={project.videoDescription}
            videoSource={project.videoSource}
          />
        </section>
      )}
      <ConservationStory project={project} />
      <ConservationProblem project={project} />
      <ConservationApproach />
      <ConservationResearchConnection project={project} />
      <ConservationSpeciesConnection project={project} />
      <ConservationCoastConnection project={project} />
      <ConservationCommunityConnection project={project} />
      <RelatedConservation currentSlug={project.slug} />
      <GetInvolvedCTA />
    </main>
  );
}
