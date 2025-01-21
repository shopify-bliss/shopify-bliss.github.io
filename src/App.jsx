import { lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SearchProvider } from "./helpers/SearchContext";
import { DashboardProvider } from "./components/LayoutDashboard/DashboardContext";
import { AiBuilderProvider } from "./components/AiBuilderSupport/AiBuilderContext";
import Loadable from "./helpers/Loadable";
import { LoaderProgress } from "./components/LoaderProgress/LoaderProgress";

const Auth = Loadable(lazy(() => import("./pages/Auth/Auth")));
const Recovery = Loadable(lazy(() => import("./pages/Auth/Recovery")));
const Verify = Loadable(lazy(() => import("./pages/Verify/Verify")));
const ErrorParent = Loadable(lazy(() => import("./pages/Error/Error")));

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
const FontsManagement = Loadable(
  lazy(() => import("./pages/FontsManagement/FontsManagement"))
);
const AiBuilder = Loadable(lazy(() => import("./pages/AiBuilder/AiBuilder")));
const AiBuilderPreview = Loadable(
  lazy(() => import("./pages/AiBuiderPreview/AiBuilderPreview"))
);

function App() {
  const DashboardCore = () => {
    return (
      <DashboardProvider>
        <Outlet />
      </DashboardProvider>
    );
  };

  const AiBuilderCore = () => {
    return (
      <AiBuilderProvider>
        <Outlet />
      </AiBuilderProvider>
    );
  };

  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route element={<AiBuilderCore />}>
            <Route path="/" element={<AiBuilder />} />
            <Route path="/preview" element={<AiBuilderPreview />} />
          </Route>
          <Route path="/loader" element={<LoaderProgress />} />

          <Route path="/login" element={<Auth typeMain={"login"} />} />
          <Route path="/signup" element={<Auth typeMain={"signup"} />} />
          <Route
            path="/verify-email"
            element={<Verify typeMain={"verify"} />}
          />
          <Route
            path="/verify-password"
            element={<Verify typeMain={"verify-password"} />}
          />
          <Route
            path="/recovery"
            element={<Recovery typeMain={"recovery"} />}
          />
          <Route
            path="/reset-password"
            element={<Recovery typeMain={"reset-password"} />}
          />
          <Route path="*" element={<ErrorParent typeMain={"404"} />} />
          <Route path="/401" element={<ErrorParent typeMain={"401"} />} />
          <Route path="/403" element={<ErrorParent typeMain={"403"} />} />
          <Route path="/404" element={<ErrorParent typeMain={"404"} />} />
          <Route element={<DashboardCore />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users-management" element={<UsersManagement />} />
            <Route path="/access-management" element={<AccessManagement />} />
            <Route
              path="/templates-management"
              element={<TemplatesManagement />}
            />
            <Route path="/fonts-management" element={<FontsManagement />} />
          </Route>
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
