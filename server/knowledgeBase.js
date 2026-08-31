// =========================================================
// Chat Knowledge Base
//
// Builds the system prompt for the site assistant directly from the
// same data files the React frontend renders (src/data/*.js) — so the
// chatbot never drifts out of sync with what's actually published on
// the site. Nothing here is hand-duplicated content.
//
// Kept deliberately compact (~1.5-2K tokens): some Groq models/plans
// reject oversized request bodies with a 413, so this favors short,
// scannable lines over full sentences.
// =========================================================

import { organization } from '../src/data/organization.js';
import { regions } from '../src/data/regions.js';
import { destinations } from '../src/data/destinations.js';
import { speciesList } from '../src/data/marineLife.js';
import { researchProjects } from '../src/data/research.js';
import { conservationProjects } from '../src/data/conservation.js';
import { communities } from '../src/data/communities.js';
import { getAllArticles } from '../src/data/news.js';

function section(title, lines) {
  if (!lines.length) return '';
  return `\n### ${title}\n${lines.join('\n')}`;
}

function truncate(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.slice(0, max - 1).trimEnd() + '…';
}

export function buildSystemPrompt() {
  const { mission, vision, whatWeDo } = organization;

  const regionLines = regions.map((r) => `- ${r.name}: ${r.destinationsCount} destinations, ~${r.coastlineKm}.`);

  const destinationLines = destinations.map((d) => `- ${d.name} (${d.region}) — ${d.destinationType}. (slug: ${d.slug})`);

  const speciesLines = speciesList.map(
    (s) => `- ${s.commonName} (${s.scientificName}) — ${s.categoryName}, ${s.conservationStatus}. (slug: ${s.slug})`
  );

  const researchLines = researchProjects.map(
    (p) => `- "${p.title}" [${p.status}, ${p.region}] — ${truncate(p.summary, 70)} (slug: ${p.slug})`
  );

  const conservationLines = conservationProjects.map(
    (p) => `- "${p.title}" [${p.status}, ${p.focusAreaName}] — ${truncate(p.summary, 70)} (slug: ${p.slug})`
  );

  const communityLines = communities.map((c) => `- ${c.name} (${c.location}) — ${truncate(c.description, 60)}`);

  const newsLines = getAllArticles()
    .slice(0, 5)
    .map((a) => `- "${a.title}" [${a.categoryLabel}] (slug: ${a.slug})`);

  return `You are the Blue Ocean Somalia site assistant, embedded on the Blue Ocean Somalia website. Blue Ocean explores, studies, protects, and shares Somalia's marine environment.

Mission: ${mission.statement}
Vision: ${vision.statement}

What We Do: ${whatWeDo.map((w) => w.title).join(', ')}.
${section('Regions', regionLines)}
${section('Destinations', destinationLines)}
${section('Marine Species Documented', speciesLines)}
${section('Research Projects', researchLines)}
${section('Conservation Projects', conservationLines)}
${section('Coastal Communities & Partners', communityLines)}
${section('Recent News & Stories', newsLines)}

Instructions:
- Answer using ONLY the facts above. Never invent species, projects, statistics, or facts not listed here.
- If asked something unrelated to Blue Ocean or Somalia's marine environment, say that's outside what you can help with and steer back to the ocean or Blue Ocean's work.
- Keep replies short and conversational — a few sentences, not an essay.
- Link to relevant pages with markdown, using the item's actual name (not its slug) as the link text and the listed slug in the URL — e.g. [Whale Shark](/marine-life/species/whale-shark), [Marine Mammal Migration Safe Corridors](/conservation/projects/<slug>), [Bosaso](/explore-the-coast/<slug>), [that story's title](/news/<slug>). Only use slugs shown above. Never show a raw slug as the visible link text.
- For "how do I get involved" questions, point to /get-involved, /get-involved/volunteer, /get-involved/partner, or /get-involved/support.
- You are not human — say so if asked.`;
}
