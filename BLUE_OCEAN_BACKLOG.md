# Blue Ocean — Remaining Development Backlog

Derived from the task tracker audit (`BLUE_OCEAN_TASK_TRACKER.txt`). Tracks the gaps still open, grouped by where they live in the system rather than by brief section number.

Status legend: **DONE** items below were completed on 2026-09-02.

## 1. Content & Media

### 1.1 Video Support
**Status:** DONE (2026-09-02)

Implemented as a single `video_url` field (mirrors how `hero_image` already works) rather than a separate title/description/thumbnail record — admins paste a YouTube/Vimeo URL or upload a video file directly, and the public page embeds whichever one is set. No page ever shows an empty video slot; the block simply doesn't render when the field is empty.

- Backend: `video_url` column added to Destinations, Species, Research Projects, Conservation Projects, News Articles, Experiences, and Community Stories (migration `0f80afd414e5`). Media Library uploads now accept `video/mp4`, `video/webm`, `video/quicktime` up to 200MB (images stay capped at 10MB), streamed to disk rather than buffered in memory.
- Admin: new `VideoPicker` widget (upload a file or paste a URL) wired into all 7 resources' Media section via a new `type: 'video'` field in `ContentFormModal`.
- Public: new `VideoEmbed` component (`src/components/shared/VideoEmbed.jsx`) auto-detects YouTube/Vimeo links vs. direct file URLs and renders the right player. Wired into all 7 public detail pages.
- End-to-end tested on Destinations (the one resource that's fully API-backed both ways): set a YouTube URL on Bosaso, confirmed it round-tripped through the API and rendered as a live `youtube-nocookie.com` embed on the public page.
- For the other 6 resources (still static-JS-driven on the public site per the pre-existing Phase-2 CMS gap — see `contentApi.js`), the admin field is live now and the public detail pages will render `videoUrl` the moment it's present on an item; adding real URLs to `src/data/*.js` shows them immediately without further code changes.

Frontend:
```
Video
├── Thumbnail
├── Play button
├── Video player
├── Caption
└── Credit
```

Only show video UI where content actually has an associated video — no empty video slots.

---

## 2. Navigation

### 2.1 Contact Navigation
**Status:** DONE — added `Contact` to `src/data/navigation.js` main nav list, linking to the existing `/contact` route.

---

## 3. Related Content System

### 3.1 Related News & Articles
**Status:** DONE (2026-09-02)

Turned out the database relationships (News Article ↔ Destination/Species/Research Project/Conservation Project/Experience/Community) already existed at the model level with real seeded data — the gaps were the admin UI to manage them and the public rendering.

- Backend: added `destination`, `species`, `research_project`, `conservation_project` query params to `GET /news-articles` for reverse lookups.
- Admin: News → Articles now has 6 multiselect fields ("Related destinations/species/research projects/conservation projects/experiences/communities") under a new "Related Content" section, pre-populated with existing links. Verified end-to-end via a temporary test admin account (created, tested, deleted).
- Public: new `DestinationRelatedNews.jsx` component renders a real "Latest Stories" block on each destination page, pulling only articles actually linked to that destination — confirmed live on Bosaso (3 real linked articles) and confirmed a destination with no links (Zeila) renders nothing.
- Only wired into Destinations so far (the one fully API-backed public resource) — Species/Research/Conservation pages could get the same "Related Stories" treatment on request once/if those move off static data.

---

## 4. Marine Life Research

### 4.1 Research Observations
**Status:** DONE (2026-09-02) — bundled in alongside Video Support since it touched the exact same species model/schema/admin-form files.

Added `research_observations` (plain text, admin textarea) to the Species model, schema, and admin form. The public species page (`SpeciesTemplate.jsx`) shows a "Research Observations" section right after the gallery/video, only when the field is populated.

---

## 5. Expeditions

### 5.1 Expedition Species
**Status:** UNDONE — expose the existing `Expedition.species` many-to-many relation as a multiselect in the admin expedition form ("Species Being Studied"), and render it on the public expedition page.

### 5.2 Available Spaces
**Status:** UNDONE — add `available_spaces` field. Only display availability once the expedition is actually open for applications.

### 5.3 Expedition Pricing
**Status:** UNDONE — add `price` + `currency` fields. Show "Price available on application" when unset — never a placeholder number.

### 5.4 Apply / Join
**Status:** UNDONE

- Public "Apply to Join" CTA + application form (name, email, phone, organization, role, country, motivation, experience, additional info)
- Confirmation message on submit
- New admin section: `Research → Expeditions → Applications`, with statuses New / Under Review / Accepted / Declined / Withdrawn

---

## 6. Social / Latest Updates

### 6.1 "Latest from Blue Ocean"
**Status:** UNDONE

Homepage section pulling automatically from existing News / Research / Conservation / Community content (and social feeds where technically supported) — not a manually maintained block.

---

## 7. Real Social Media

### 7.1 Replace Placeholder URLs
**Status:** UNDONE

Add an admin `Settings → Social Media` panel (Instagram, Facebook, TikTok, YouTube, LinkedIn, X) backing the Footer and "Latest from Blue Ocean" — not hardcoded in React.

---

## 8. Mission & Vision

### 8.1 Mission Statement
**Status:** DONE — `organization.mission.statement` now reads "To explore, study, protect, and share Somalia's marine environment with the world." (the brief's exact wording), shown on the About page's Mission/Vision section.

### 8.2 Vision Statement
**Status:** DONE — `organization.vision.statement` now reads "A future where Somalia's ocean is understood, protected, and sustainably used for education, tourism, research, and economic opportunity." (the brief's exact wording).

---

## 9. Mobile QA

### 9.1 Real-Device Mobile Testing
**Status:** UNDONE — final QA stage, not a dev task. Needs real devices (small/standard/large phones across iOS and Android, plus tablets), covering navigation, media, all major page types, forms, auth, dashboards, theme switching, touch/scroll behavior, and slow-connection performance.

---

## Recommended Order

```
01. Contact Navigation                 ✅ done
02. Mission & Vision                   ✅ done
03. Video Support                      ✅ done
04. Related Content System             ✅ done
05. Marine Life Research Observations  ✅ done (bundled with #3)
06. Expedition Species                 ← next
07. Expedition Available Spaces
08. Expedition Pricing
09. Expedition Apply / Join
10. Latest from Blue Ocean
11. Real Social Media URLs
12. Real-Device QA
```

Dependency chain: Video Support → Related Content → Marine Life/Research relationships → Expedition relationships → Apply/Join → Latest from Blue Ocean → Social integration → Mobile QA → Launch.

Before launch, add a Content & Data Verification pass (Hurdiya, illegal fishing, marine species, research observations, expedition info, mission/vision, social accounts) between "development complete" and real-device testing.
