import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AiBuilder from "./pages/AiBuilder/AiBuilder";
import { Login, Signup } from "./pages/Auth/Auth";
import { Error404, Error401 } from "./pages/Error/Error";
import Dashboard from "./pages/Dashboard/Dashboard";
import TemplatesManagement from "./pages/TemplatesManagement/TemplatesManagement";
import Profile from "./pages/Profile/Profile";
import { SearchProvider } from "./helpers/SearchContext";
import { DashboardProvider } from "./components/LayoutDashboard/DashboardContext";

import "./main.css";
import "lenis/dist/lenis.css";

// Dashboard Layout wrapper with Outlet to render child routes
const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<AiBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/401" element={<Error401 />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/templates-management"
              element={<TemplatesManagement />}
            />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);
