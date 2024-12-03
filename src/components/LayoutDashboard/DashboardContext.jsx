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
import { useLocation } from "react-router-dom";

const DashboardContext = createContext({
  activeMenu: null,
  menu: [],
  activeSubmenu: [],
  submenu: [],
  submenuPage: "",
  handleSubmenuPage: () => {},
  accessMenu: [],
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState([]);
  const [submenuPage, setSubmenuPage] = useState(null);
  const location = useLocation();

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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
