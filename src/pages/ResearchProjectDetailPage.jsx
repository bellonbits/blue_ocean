import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useScrollReveal, useTrackRecentlyViewed } from '../lib/hooks';
import { getProjectBySlug } from '../data/research';
import ResearchProjectHero from '../components/research/ResearchProjectHero';
import ResearchOverview from '../components/research/ResearchOverview';
import ResearchObjectives from '../components/research/ResearchObjectives';
import ResearchMethodology from '../components/research/ResearchMethodology';
import ResearchLocation from '../components/research/ResearchLocation';
import ResearchSpecies from '../components/research/ResearchSpecies';
import ResearchFindings from '../components/research/ResearchFindings';
import ResearchConservationConnection from '../components/research/ResearchConservationConnection';
import RelatedResearch from '../components/research/RelatedResearch';
import ResearchCTA from '../components/research/ResearchCTA';

export default function ResearchProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  useScrollReveal();

  useTrackRecentlyViewed(
    project && {
      type: 'research',
      slug: project.slug,
      title: project.title,
      subtitle: project.areaName,
      image: project.heroImage,
      path: `/research/projects/${project.slug}`,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = project
      ? `${project.title} — Blue Ocean Research`
      : 'Research Project Not Found — Blue Ocean Somalia';
  }, [project]);

  if (!project) {
    return (
      <main className="container section" style={{ minHeight: '70vh', paddingTop: 'calc(var(--header-height) + 60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Compass size={48} style={{ color: 'var(--color-turquoise)' }} />
          <h1 className="display-heading">Research Project Not Found</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The research project you are looking for is not currently published. Explore our full research directory.
          </p>
          <Link to="/research/projects" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <ArrowLeft size={16} />
            <span>Return to Research Projects</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="research-project-detail-page" aria-label={`Research Project: ${project.title}`}>
      <ResearchProjectHero project={project} />
      <ResearchOverview project={project} />
      <ResearchObjectives project={project} />
      <ResearchMethodology project={project} />
      <ResearchLocation project={project} />
      <ResearchSpecies project={project} />
      <ResearchFindings project={project} />
      <ResearchConservationConnection project={project} />
      <RelatedResearch currentSlug={project.slug} />
      <ResearchCTA />
    </main>
  );
}
