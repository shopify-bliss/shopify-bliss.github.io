import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { toastMessage, toastDevelop } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import Cookies from "js-cookie";

const DashboardContext = createContext({
  activeMenu: null,
  menu: [],
  activeSubmenu: [],
  submenu: [],
  submenuPage: "",
  handleSubmenuPage: () => {},
  accessMenu: [],
  toastMessage: null,
  toastDevelop: null,
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState([]);
  const [submenuPage, setSubmenuPage] = useState(null);
  const [menu, setMenu] = useState([]);
  const [submenu, setSubmenu] = useState([]);
  const [accessMenu, setAccessMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  // const token = //Cookies.get("shopify-bliss");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const currentPath = location.pathname.replace("/", "");

      try {
        setIsLoading(true);

        if (!token) {
          return;
        }

        const [menuResponse, submenuResponse, accessMenuResponse] =
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
          ]);

        const menuData = menuResponse.data.data;
        const submenuData = submenuResponse.data.data;
        const accessMenuData = accessMenuResponse.data.data;

        const currentMenu = menuData.find((data) => data.url === currentPath);

        if (currentMenu) {
          const filteredSubmenu = submenuData.filter(
            (submenuItem) => submenuItem.menu_id === currentMenu.menu_id
          );

          setActiveMenu(currentMenu.menu_id);
          setActiveSubmenu(filteredSubmenu);

          const defaultSubmenu = filteredSubmenu.find((data) => data.default);

          setSubmenuPage(defaultSubmenu ? defaultSubmenu.name : null);
        } else {
          setActiveMenu(null);
          setActiveSubmenu([]);
          setSubmenuPage(null);
        }

        setMenu(menuData);
        setSubmenu(submenuData);
        setAccessMenu(accessMenuData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toastMessage("error", err.message || "Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!token) {
        setIsLoading(false);
      }
    }, 1500);

    if (token) {
      fetchDashboardData();
      clearTimeout(timeoutId);
    } else {
      setIsLoading(true);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token, location.pathname, urlEndpoint]);

  const handleSubmenuPage = useCallback((submenuName) => {
    setSubmenuPage(submenuName);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        activeMenu,
        menu,
        activeSubmenu,
        submenu,
        submenuPage,
        handleSubmenuPage,
        accessMenu,
        toastMessage,
        toastDevelop,
      }}
    >
      {isLoading ? (
        <div style={{ padding: "20px" }}>
          <Skeleton height={30} width="80%" style={{ marginBottom: "10px" }} />
          <Skeleton height={30} width="60%" style={{ marginBottom: "10px" }} />
          <Skeleton height={30} width="70%" />
        </div>
      ) : (
        children
      )}
      <ToastContainer />
    </DashboardContext.Provider>
  );
};
