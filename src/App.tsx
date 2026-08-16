import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import LegalPage from "@/pages/LegalPage";

const KAWI_APP_URL = "https://kawiservices.com.br/app";

const ExternalAppRedirect = () => {
  useEffect(() => {
    window.location.replace(KAWI_APP_URL);
  }, []);

  return null;
};

const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/privacy" element={<LegalPage kind="privacy" />} />
    <Route path="/regulation" element={<LegalPage kind="regulation" />} />
    <Route path="/account-deletion" element={<LegalPage kind="account-deletion" />} />
    <Route path="/data-deletion" element={<LegalPage kind="data-deletion" />} />
    <Route path="/app" element={<ExternalAppRedirect />} />
    <Route path="/app/*" element={<ExternalAppRedirect />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
