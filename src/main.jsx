import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AiBuilder from "./pages/AiBuilder/AiBuilder";
import { Login, Signup } from "./pages/Auth/Auth";
import { Error404, Error401, Error403 } from "./pages/Error/Error";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import UsersManagement from "./pages/UsersManagement/UsersManagement";
import MenuManagement from "./pages/AccessManagement/MenuManagement/MenuManagement";
import TemplatesManagement from "./pages/TemplatesManagement/TemplatesManagement";
import { SearchProvider } from "./helpers/SearchContext";
import { DashboardProvider } from "./components/LayoutDashboard/DashboardContext";

import "./main.css";
import "lenis/dist/lenis.css";
import { User } from "lucide-react";
import AccessManagement from "./pages/AccessManagement/AccessManagement";

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
          <Route path="/403" element={<Error403 />} />
          <Route path="/401" element={<Error401 />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users-management" element={<UsersManagement />} />
            <Route path="/access-management" element={<AccessManagement />} />
            <Route
              path="/templates-management"
              element={<TemplatesManagement />}
            />
          </Route>
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);
