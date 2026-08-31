import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ExploreCoastPage from './pages/ExploreCoastPage';
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

function AppLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Sprint 2: Explore the Coast Routes */}
        <Route path="/explore-the-coast" element={<ExploreCoastPage />} />
        <Route path="/explore-the-coast/:slug" element={<DestinationDetailPage />} />
        <Route path="/explore" element={<Navigate to="/explore-the-coast" replace />} />
        <Route path="/explore/:slug" element={<DestinationDetailPage />} />

        {/* Sprint 3: Marine Life Library Routes */}
        <Route path="/marine-life" element={<MarineLifePage />} />
        <Route path="/marine-life/species" element={<SpeciesDirectoryPage />} />
        <Route path="/marine-life/species/:slug" element={<SpeciesDetailPage />} />
        <Route path="/marine-life/:slug" element={<SpeciesDetailPage />} />

        {/* Sprint 5: Ocean Experiences Routes */}
        <Route path="/experiences" element={<OceanExperiencesPage />} />
        <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />

        {/* Sprint 4: Research Routes */}
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/projects" element={<ResearchProjectsPage />} />
        <Route path="/research/projects/:slug" element={<ResearchProjectDetailPage />} />
        <Route path="/research/reports" element={<ResearchReportsPage />} />
        <Route path="/research/team" element={<ResearchTeamPage />} />
        <Route path="/research/team/:slug" element={<ResearchTeamDetailPage />} />
        <Route path="/research/expeditions" element={<ResearchExpeditionsPage />} />
        <Route path="/research/statistics" element={<ResearchStatisticsPage />} />
        <Route path="/research/coastal-geography" element={<ResearchGeomorphologyPage />} />
        <Route path="/research/publications" element={<PublicationsPage />} />
        {/* "Data & Reports" — the existing Reports page already covers this */}
        <Route path="/research/data" element={<Navigate to="/research/reports" replace />} />

        {/* Sprint 6: Conservation & Coastal Communities Routes */}
        <Route path="/conservation" element={<ConservationPage />} />
        <Route path="/conservation/projects" element={<ConservationProjectsPage />} />
        <Route path="/conservation/projects/:slug" element={<ConservationProjectDetailPage />} />

        <Route path="/communities" element={<CoastalCommunitiesPage />} />
        <Route path="/coastal-communities" element={<Navigate to="/communities" replace />} />
        <Route path="/communities/:slug" element={<CommunityStoryDetailPage />} />

        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
        <Route path="/get-involved/partner" element={<PartnerPage />} />
        <Route path="/get-involved/support" element={<SupportPage />} />

        {/* Sprint 7: News, About & Contact Routes */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/articles" element={<NewsArticlesPage />} />
        <Route path="/news/:slug" element={<ArticleDetailPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/team" element={<TeamDirectoryPage />} />
        <Route path="/about/team/:slug" element={<TeamMemberProfilePage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin/CMS Dashboard */}
        <Route path="/dashboard" element={<AdminLayout />}>
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
        <Route path="/dashboard/content/coast/destinations/:id/preview" element={<DestinationPreviewPage />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page Not Found"
              description="The page you're looking for doesn't exist yet. Head back to the homepage to explore Blue Ocean Somalia."
              emoji="🔍"
            />
          }
        />
      </Routes>
      {!isDashboard && <Footer />}
      {!isDashboard && <ChatWidget />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
          <AuthModal />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
