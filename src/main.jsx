import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SearchProvider } from "./helpers/SearchContext";
import { DashboardProvider } from "./components/LayoutDashboard/DashboardContext";
import Loadable from "./helpers/Loadable";

// Lazy-loaded components with Loadable
const LoaderProgress = Loadable(
  lazy(() => import("./components/LoaderProgress/LoaderProgress"))
);
const Auth = Loadable(lazy(() => import("./pages/Auth/Auth")));
const Error404 = Loadable(lazy(() => import("./pages/Error/Error")));
const Error401 = Loadable(lazy(() => import("./pages/Error/Error")));
const Error403 = Loadable(lazy(() => import("./pages/Error/Error")));
const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/Dashboard")));
const Profile = Loadable(lazy(() => import("./pages/Profile/Profile")));
const UsersManagement = Loadable(
  lazy(() => import("./pages/UsersManagement/UsersManagement"))
);
const TemplatesManagement = Loadable(
  lazy(() => import("./pages/TemplatesManagement/TemplatesManagement"))
);
const AccessManagement = Loadable(
  lazy(() => import("./pages/AccessManagement/AccessManagement"))
);
const AiBuilder = Loadable(lazy(() => import("./pages/AiBuilder/AiBuilder")));

import "./main.css";
import "lenis/dist/lenis.css";

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
          <Route
            path="/login"
            element={<Auth typeMain={"login"} />}
          />
          <Route
            path="/signup"
            element={<Auth typeMain={"signup"} />}
          />
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
