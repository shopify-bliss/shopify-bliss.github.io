import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import menu from "../../data/menu.json";
import submenu from "../../data/submenu.json";
import accessMenu from "../../data/accessMenu.json";
import { useLocation, useSearchParams } from "react-router-dom";
import { toastMessage, toastDevelop } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

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
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState([]);
  const [submenuPage, setSubmenuPage] = useState(null);
  const location = useLocation();

  const cookies = new Cookies(null, { path: "/" });
  const [searchParams] = useSearchParams();

  const getTokenParams = searchParams.get("shopify-bliss");

  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    const getMenu = menu.find((data) => data.url === currentPath);

    if (getMenu) {
      const filteredSubmenu = submenu.filter(
        (submenuItem) => submenuItem.menu_id === getMenu.id
      );

      setActiveMenu(getMenu.id);
      setActiveSubmenu(filteredSubmenu);

      const defaultSubmenu = filteredSubmenu.find((data) => data.default);
      if (defaultSubmenu) {
        setSubmenuPage(defaultSubmenu.name);
      } else {
        setSubmenuPage(null);
      }
    } else {
      setActiveMenu(null);
      setActiveSubmenu([]);
      setSubmenuPage(null);
    }
  }, [location]);

  const handleSubmenuPage = useCallback((submenuName) => {
    setSubmenuPage(submenuName);
  }, []);

  useEffect(() => {
    if (getTokenParams) {
      cookies.set("shopify-bliss", getTokenParams);

      const params = new URLSearchParams(window.location.search);
      params.delete("shopify-bliss");
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, [getTokenParams, cookies]);

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
      {children}
      <ToastContainer />
    </DashboardContext.Provider>
  );
};
