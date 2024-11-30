import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AiBuilder from "./pages/AiBuilder/AiBuilder";
import Login from "./pages/Login/Login";
import Error404 from "./pages/Error404/Error404";
import { SearchProvider } from "./helpers/SearchContext";
import "./main.css";
import "lenis/dist/lenis.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<AiBuilder />} />
          <Route path="/dashboard" element={<AiBuilder />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);
