import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage, stripLangPrefix } from './context/LanguageContext';
import AuthModal from './components/auth/AuthModal';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileTabBar from './components/layout/MobileTabBar';
import Home from './pages/Home';
import ExploreCoastPage from './pages/ExploreCoastPage';
import TourismPage from './pages/TourismPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import MarineLifePage from './pages/MarineLifePage';
import SpeciesDirectoryPage from './pages/SpeciesDirectoryPage';
import SpeciesDetailPage from './pages/SpeciesDetailPage';
import OceanExperiencesPage from './pages/OceanExperiencesPage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import ResearchPage from './pages/ResearchPage';
import ResearchProjectsPage from './pages/ResearchProjectsPage';
import ResearchProjectDetailPage from './pages/ResearchProjectDetailPage';
import ResearchReportsPage from './pages/ResearchReportsPage';
import ResearchTeamPage from './pages/ResearchTeamPage';
import ResearchTeamDetailPage from './pages/ResearchTeamDetailPage';
import ResearchExpeditionsPage from './pages/ResearchExpeditionsPage';
import ResearchStatisticsPage from './pages/ResearchStatisticsPage';
import ResearchGeomorphologyPage from './pages/ResearchGeomorphologyPage';
import ConservationPage from './pages/ConservationPage';
import ConservationProjectsPage from './pages/ConservationProjectsPage';
import ConservationProjectDetailPage from './pages/ConservationProjectDetailPage';
import ConservationIllegalFishingPage from './pages/ConservationIllegalFishingPage';
import CoastalCommunitiesPage from './pages/CoastalCommunitiesPage';
import CommunityStoryDetailPage from './pages/CommunityStoryDetailPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import VolunteerPage from './pages/VolunteerPage';
import PartnerPage from './pages/PartnerPage';
import SupportPage from './pages/SupportPage';
import NewsPage from './pages/NewsPage';
import NewsArticlesPage from './pages/NewsArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TeamDirectoryPage from './pages/TeamDirectoryPage';
import TeamMemberProfilePage from './pages/TeamMemberProfilePage';
import PressPage from './pages/PressPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PublicationsPage from './pages/PublicationsPage';
import ProfilePage from './pages/ProfilePage';
import PlaceholderPage from './pages/PlaceholderPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import SavedPage from './pages/dashboard/SavedPage';
import MyExperiencesPage from './pages/dashboard/MyExperiencesPage';
import MyResearchPage from './pages/dashboard/MyResearchPage';
import DashboardMessagesPage from './pages/dashboard/MessagesPage';
import DashboardGetInvolvedPage from './pages/dashboard/GetInvolvedPage';
import DashboardProfilePage from './pages/dashboard/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardOverviewPage from './pages/admin/DashboardOverviewPage';
import InboxPage from './pages/admin/InboxPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminExploreCoastPage from './pages/admin/content/ExploreCoastPage';
import DestinationPreviewPage from './pages/admin/content/DestinationPreviewPage';
import OceanExperiencesAdminPage from './pages/admin/content/OceanExperiencesAdminPage';
import MarineLifeAdminPage from './pages/admin/content/MarineLifePage';
import ResearchAdminPage from './pages/admin/content/ResearchPage';
import ConservationAdminPage from './pages/admin/content/ConservationPage';
import CommunitiesAdminPage from './pages/admin/content/CommunitiesPage';
import NewsAdminPage from './pages/admin/content/NewsPage';
import TeamAdminPage from './pages/admin/content/TeamPage';
import MediaAdminPage from './pages/admin/content/MediaPage';
import ChatWidget from './components/chat/ChatWidget';
import NativeAppGate from './onboarding/NativeAppGate';
import './styles/globals.css';
import { useScrollReveal } from './lib/hooks';

// Scroll to top and trigger scroll reveal on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// The public content routes (Home, Tourism, Explore the Coast, Marine
// Life, Research, Conservation, Communities, News, About, Contact, Get
// Involved) are mounted twice below — once under /en, once under /so —
// via this shared array rather than duplicating the JSX, so there's one
// source of truth for the route list. Admin/Dashboard/Profile are
// internal, staff/account tools and deliberately stay unprefixed (see
// BLUE_OCEAN_BACKLOG.md section 10.1).
function localizedRoutes() {
  return [
    <Route index element={<Home />} key="home" />,

    // Sprint 2: Explore the Coast Routes
    <Route path="tourism" element={<TourismPage />} key="tourism" />,
    <Route path="explore-the-coast" element={<ExploreCoastPage />} key="explore-the-coast" />,
    <Route path="explore-the-coast/:slug" element={<DestinationDetailPage />} key="explore-the-coast-slug" />,
    <Route path="explore" element={<Navigate to="../explore-the-coast" replace />} key="explore" />,
    <Route path="explore/:slug" element={<DestinationDetailPage />} key="explore-slug" />,

    // Sprint 3: Marine Life Library Routes
    <Route path="marine-life" element={<MarineLifePage />} key="marine-life" />,
    <Route path="marine-life/species" element={<SpeciesDirectoryPage />} key="marine-life-species" />,
    <Route path="marine-life/species/:slug" element={<SpeciesDetailPage />} key="marine-life-species-slug" />,
    <Route path="marine-life/:slug" element={<SpeciesDetailPage />} key="marine-life-slug" />,

    // Sprint 5: Ocean Experiences Routes
    <Route path="experiences" element={<OceanExperiencesPage />} key="experiences" />,
    <Route path="experiences/:slug" element={<ExperienceDetailPage />} key="experiences-slug" />,

    // Sprint 4: Research Routes
    <Route path="research" element={<ResearchPage />} key="research" />,
    <Route path="research/projects" element={<ResearchProjectsPage />} key="research-projects" />,
    <Route path="research/projects/:slug" element={<ResearchProjectDetailPage />} key="research-projects-slug" />,
    <Route path="research/reports" element={<ResearchReportsPage />} key="research-reports" />,
    <Route path="research/team" element={<ResearchTeamPage />} key="research-team" />,
    <Route path="research/team/:slug" element={<ResearchTeamDetailPage />} key="research-team-slug" />,
    <Route path="research/expeditions" element={<ResearchExpeditionsPage />} key="research-expeditions" />,
    <Route path="research/statistics" element={<ResearchStatisticsPage />} key="research-statistics" />,
    <Route path="research/coastal-geography" element={<ResearchGeomorphologyPage />} key="research-coastal-geography" />,
    <Route path="research/publications" element={<PublicationsPage />} key="research-publications" />,
    // "Data & Reports" — the existing Reports page already covers this
    <Route path="research/data" element={<Navigate to="../research/reports" replace />} key="research-data" />,

    // Sprint 6: Conservation & Coastal Communities Routes
    <Route path="conservation" element={<ConservationPage />} key="conservation" />,
    <Route path="conservation/illegal-fishing" element={<ConservationIllegalFishingPage />} key="conservation-illegal-fishing" />,
    <Route path="conservation/projects" element={<ConservationProjectsPage />} key="conservation-projects" />,
    <Route path="conservation/projects/:slug" element={<ConservationProjectDetailPage />} key="conservation-projects-slug" />,

    <Route path="communities" element={<CoastalCommunitiesPage />} key="communities" />,
    <Route path="coastal-communities" element={<Navigate to="../communities" replace />} key="coastal-communities" />,
    <Route path="communities/:slug" element={<CommunityStoryDetailPage />} key="communities-slug" />,

    <Route path="get-involved" element={<GetInvolvedPage />} key="get-involved" />,
    <Route path="get-involved/volunteer" element={<VolunteerPage />} key="get-involved-volunteer" />,
    <Route path="get-involved/partner" element={<PartnerPage />} key="get-involved-partner" />,
    <Route path="get-involved/support" element={<SupportPage />} key="get-involved-support" />,

    // Sprint 7: News, About & Contact Routes
    <Route path="news" element={<NewsPage />} key="news" />,
    <Route path="news/articles" element={<NewsArticlesPage />} key="news-articles" />,
    <Route path="news/:slug" element={<ArticleDetailPage />} key="news-slug" />,

    <Route path="about" element={<AboutPage />} key="about" />,
    <Route path="about/team" element={<TeamDirectoryPage />} key="about-team" />,
    <Route path="about/team/:slug" element={<TeamMemberProfilePage />} key="about-team-slug" />,

    <Route path="contact" element={<ContactPage />} key="contact" />,
    <Route path="press" element={<PressPage />} key="press" />,
    <Route path="privacy" element={<PrivacyPolicyPage />} key="privacy" />,

    // 404 fallback, scoped inside /en and /so so it still gets Header/Footer
    <Route
      path="*"
      element={
        <PlaceholderPage
          title="Page Not Found"
          description="The page you're looking for doesn't exist yet. Head back to the homepage to explore Blue Ocean Somalia."
          emoji="🔍"
        />
      }
      key="not-found"
    />,
  ];
}

// "/" itself (no language segment) — send first-time visitors to their
// detected/saved language's homepage.
function RootRedirect() {
  const { language } = useLanguage();
  return <Navigate to={`/${language}`} replace />;
}

// Anything that isn't /en, /so, /admin, /dashboard, or /profile — almost
// always an old bookmark or external link to a pre-localization URL
// (e.g. /tourism) — gets replayed under the current language rather than
// 404ing.
function LegacyRedirect() {
  const { language } = useLanguage();
  const location = useLocation();
  return <Navigate to={`/${language}${location.pathname}${location.search}`} replace />;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <Outlet />
      {!isDashboard && <Footer />}
      {!isDashboard && <ChatWidget />}
      {!isDashboard && <MobileTabBar />}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<RootRedirect />} />

        <Route path="en" element={<Outlet />}>{localizedRoutes()}</Route>
        <Route path="so" element={<Outlet />}>{localizedRoutes()}</Route>

        <Route path="profile" element={<ProfilePage />} />

        {/* Member dashboard — personal ocean discovery hub, any logged-in account */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="experiences" element={<MyExperiencesPage />} />
          <Route path="research" element={<MyResearchPage />} />
          <Route path="get-involved" element={<DashboardGetInvolvedPage />} />
          <Route path="messages" element={<DashboardMessagesPage />} />
          <Route path="profile" element={<DashboardProfilePage />} />
        </Route>

        {/* Admin/CMS — staff only (super_admin/admin/editor/researcher/content_manager) */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="content/coast" element={<AdminExploreCoastPage />} />
          <Route path="content/experiences" element={<OceanExperiencesAdminPage />} />
          <Route path="content/marine-life" element={<MarineLifeAdminPage />} />
          <Route path="content/research" element={<ResearchAdminPage />} />
          <Route path="content/conservation" element={<ConservationAdminPage />} />
          <Route path="content/communities" element={<CommunitiesAdminPage />} />
          <Route path="content/news" element={<NewsAdminPage />} />
          <Route path="team" element={<TeamAdminPage />} />
          <Route path="media" element={<MediaAdminPage />} />
        </Route>

        {/* Preview renders full-bleed like the real public page — no admin sidebar/topbar */}
        <Route path="admin/content/coast/destinations/:id/preview" element={<DestinationPreviewPage />} />

        {/* Any pre-localization bookmark/link (e.g. /tourism, /research/projects) */}
        <Route path="*" element={<LegacyRedirect />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <NativeAppGate>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <LanguageProvider>
              <AppRoutes />
              <AuthModal />
            </LanguageProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </NativeAppGate>
  );
}

export { stripLangPrefix };
