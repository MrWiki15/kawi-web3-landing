import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";

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
    <Route path="/app" element={<ExternalAppRedirect />} />
    <Route path="/app/*" element={<ExternalAppRedirect />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
