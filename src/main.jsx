import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AiBuilder from "./pages/AiBuilder/AiBuilder";
import { Login, Signup } from "./pages/Auth/Auth";
import Error404 from "./pages/Error404/Error404";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import { SearchProvider } from "./helpers/SearchContext";
import "./main.css";
import "lenis/dist/lenis.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<AiBuilder />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);
