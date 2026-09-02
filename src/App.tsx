import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import LanguageDetectModal from "@/components/LanguageDetectModal";
import { CookieConsentProvider, useCookieConsent } from "@/contexts/CookieConsentContext";
import { ExternalLinkProvider } from "@/contexts/ExternalLinkContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Secondary routes are split out so the landing page ships without the blog
// corpus, which keeps the first paint on the page most organic traffic lands on.
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));

const KAWI_APP_URL = "https://kawiservices.com.br/app";

const ExternalAppRedirect = () => {
  useEffect(() => {
    window.location.replace(KAWI_APP_URL);
  }, []);

  return null;
};

/** The language suggestion waits until the cookie notice has been answered. */
const LanguageSuggestion = () => {
  const { accepted } = useCookieConsent();
  if (!accepted) return null;
  return <LanguageDetectModal />;
};

const App = () => (
  <LanguageProvider>
    <CookieConsentProvider>
      <ExternalLinkProvider>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/cookies" element={<LegalPage kind="cookies" />} />
            <Route path="/regulation" element={<LegalPage kind="regulation" />} />
            <Route
              path="/account-deletion"
              element={<LegalPage kind="account-deletion" />}
            />
            <Route path="/data-deletion" element={<LegalPage kind="data-deletion" />} />
            <Route path="/app" element={<ExternalAppRedirect />} />
            <Route path="/app/*" element={<ExternalAppRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <LanguageSuggestion />
        <CookieConsentBanner />
      </ExternalLinkProvider>
    </CookieConsentProvider>
  </LanguageProvider>
);

export default App;
