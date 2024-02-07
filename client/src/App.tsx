import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./LandingPage";
import InputPage from "./InputPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="application" element={<InputPage />} />
      </Routes>
    </BrowserRouter>
  );
}