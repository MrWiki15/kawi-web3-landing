import { Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";

const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
