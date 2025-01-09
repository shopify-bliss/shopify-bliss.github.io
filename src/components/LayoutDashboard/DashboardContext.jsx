import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  toastMessage,
  toastDevelop,
  toastPromise,
} from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import urlEndpoint from "../../helpers/urlEndpoint";
import { LoaderPages } from "../LoaderProgress/LoaderProgress";

const DashboardContext = createContext({
  activeMenu: null,
  menus: [],
  activeSubmenu: [],
  submenus: [],
  submenuPage: "",
  handleSubmenuPage: () => {},
  accessMenus: [],
  toastMessage: null,
  toastDevelop: null,
  toastPromise: null,
  fetchDashboardData: () => {},
  user: null,
  token: null,
  isLoadingDashboard: false,
  setDashboardLoader: () => {},
});

export const DashboardProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState([]);
  const [submenuPage, setSubmenuPage] = useState(null);
  const [menus, setMenus] = useState([]);
  const [submenus, setSubmenus] = useState([]);
  const [accessMenus, setAccessMenus] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const setDashboardLoader = useCallback((loading) => {
    setIsLoadingDashboard((prev) => {
      if (prev !== loading) {
        return loading;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const tokenFromCookies = Cookies.get("shopify-bliss");

    if (tokenFromCookies) {
      setToken(tokenFromCookies);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const fetchDashboardData = useCallback(async () => {
    setDashboardLoader(true);

    if (!token) {
      navigate("/401", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentPath = location.pathname.replace("/", "");

      const [menuResponse, submenuResponse, accessMenuResponse, userResponse] =
        await Promise.all([
          axios.get(urlEndpoint.menus),
          axios.get(urlEndpoint.submenus, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(urlEndpoint.accessManagement, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${urlEndpoint.userId}?userID=${decoded.user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      setMenus(menuResponse.data.data);
      setSubmenus(submenuResponse.data.data);
      setAccessMenus(accessMenuResponse.data.data);
      setUser(userResponse.data.data);

      const currentMenu = menuResponse.data.data.find(
        (data) => data.url === currentPath
      );

      if (currentMenu) {
        const filteredSubmenu = submenuResponse.data.data.filter(
          (submenuItem) => submenuItem.menu_id === currentMenu.menu_id
        );

        setActiveMenu(currentMenu.menu_id);
        setActiveSubmenu(filteredSubmenu);

        const defaultSubmenu = filteredSubmenu.find((data) => data.default);
        setSubmenuPage(defaultSubmenu ? defaultSubmenu.name : null);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      navigate("/login", { replace: true });
    } finally {
      setDashboardLoader(false);
    }
  }, [token, location.pathname, navigate]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  const handleSubmenuPage = useCallback(
    (submenuName) => {
      setSubmenuPage(submenuName);
    },
    [setSubmenuPage]
  );

  const contextValue = useMemo(
    () => ({
      activeMenu,
      menus,
      activeSubmenu,
      submenus,
      submenuPage,
      handleSubmenuPage,
      accessMenus,
      toastMessage,
      toastDevelop,
      toastPromise,
      fetchDashboardData,
      user,
      token,
      isLoadingDashboard,
      setDashboardLoader,
    }),
    [
      activeMenu,
      menus,
      activeSubmenu,
      submenus,
      submenuPage,
      handleSubmenuPage,
      accessMenus,
      toastMessage,
      toastDevelop,
      toastPromise,
      fetchDashboardData,
      user,
      token,
      isLoadingDashboard,
    ]
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {isLoadingDashboard && <LoaderPages />}
      {children}
      <ToastContainer />
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
