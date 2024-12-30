import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import {
  toastMessage,
  toastDevelop,
  toastPromise,
} from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useAuth } from "../../helpers/AuthContext";
import { jwtDecode } from "jwt-decode";

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

  const location = useLocation();
  const { token } = useAuth();

  const fetchDashboardData = useCallback(async () => {
    const currentPath = location.pathname.replace("/", "");
    const decoded = jwtDecode(token);

    try {
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
          axios.get(`${urlEndpoint.userId}?id=${decoded.user_id}`, {
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
    }
  }, [token, location.pathname, urlEndpoint]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  const handleSubmenuPage = useCallback((submenuName) => {
    setSubmenuPage(submenuName);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
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
      }}
    >
      {children}
      <ToastContainer />
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
