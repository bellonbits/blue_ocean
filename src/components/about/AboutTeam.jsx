import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { getAllTeams } from '../../data/research';
import ResearchTeamCard from '../research/ResearchTeamCard';
import '../research/ResearchTeamCard.css';
import '../../pages/ResearchTeamPage.css';

export default function AboutTeam() {
  const teams = getAllTeams();

  return (
    <section className="research-obj section" aria-labelledby="about-team-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="label-text">OUR TEAM</span>
          <div className="divider" />
          <h2 className="section-heading" id="about-team-heading">
            The units behind the work
          </h2>
          <p className="section-subheading">
            Blue Ocean's field research runs through specialist units organized by area of focus.
          </p>
        </div>

        <div
          className="exp-grid__notice reveal"
          style={{ marginBottom: 'var(--space-8)', background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(240,246,255,0.8)' }}
        >
          <Info size={16} />
          <span>
            Individual staff profiles are not yet published — teams are shown here as organizational units until
            Blue Ocean's full roster is confirmed.
          </span>
        </div>

        <div className="research-team-grid reveal">
          {teams.map((team) => (
            <ResearchTeamCard key={team.id} team={team} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link to="/research/team" className="btn btn-outline btn-lg">
            <span>View Full Research Team</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
