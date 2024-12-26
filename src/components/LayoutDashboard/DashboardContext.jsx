import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  toastMessage,
  toastDevelop,
  toastPromise,
} from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useDataToken } from "../../helpers/DataToken";
import { Error401 } from "../../pages/Error/Error";

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
  toastPromise: null,
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
  const navigate = useNavigate();
  const { token } = useDataToken();

  useEffect(() => {
    let waitingToken;

    const fetchDashboardData = async () => {
      const currentPath = location.pathname.replace("/", "");

      try {
        setIsLoading(true);

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
        }

        setMenu(menuData);
        setSubmenu(submenuData);
        setAccessMenu(accessMenuData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    } else {
      waitingToken = setTimeout(() => {
        if (!token) {
          navigate("/401");
        }
      }, 3000);
    }

    return () => clearTimeout(waitingToken);
  }, [token, location.pathname, navigate, urlEndpoint]);

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
        toastPromise,
      }}
    >
      {isLoading ? (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      ) : (
        children
      )}
      <ToastContainer />
    </DashboardContext.Provider>
  );
};
