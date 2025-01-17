/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { LoaderProgress } from "../LoaderProgress/LoaderProgress";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const AiBuilderContext = createContext({
  dataBrands: [],
  dataPages: [],
  dataElements: [],
  dataColors: [],
  dataFonts: [],
  initialPageId: 99,
  currentPageId: null,
  setCurrentPageId: () => {},
  user: null,
  token: null,
  isLoadingAiBuilder: false,
  setAiBuilderLoader: () => {},
});

export const AiBuilderProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState(null);
  const [dataBrands, setDataBrands] = useState([]);
  const [dataPages, setDataPages] = useState([]);
  const [dataElements, setDataElements] = useState([]);
  const [dataColors, setDataColors] = useState([]);
  const [dataFonts, setDataFonts] = useState([]);
  const [isLoadingAiBuilder, setIsLoadingAiBuilder] = useState(false);
  const initialPageId = 99;
  const [currentPageId, setCurrentPageId] = useState(initialPageId);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const setAiBuilderLoader = useCallback((loading) => {
    setIsLoadingAiBuilder((prev) => {
      if (prev !== loading) {
        return loading;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const tokenFromCookies = Cookies.get("shopify-bliss");

    if (tokenFromCookies) {
      const decodedToken = jwtDecode(tokenFromCookies);

      setToken(tokenFromCookies);
      setUser(decodedToken);
    } else {
      navigate("/login", {
        replace: true,
        state: { messageNoToken: "You need to sign in to proceed" },
      });
    }
  }, [navigate]);

  const fetchDataAiBuilder = useCallback(async () => {
    setIsLoadingAiBuilder(true);

    try {
      const brandPromise = axios.get(urlEndpoint.brandsAi);
      const pagesPromise = axios.get(urlEndpoint.pagesAi);
      const elementsPromise = axios.get(urlEndpoint.elementsAi);
      const colorsPromise = axios.get(urlEndpoint.colorsAi);
      const fontsPromise = axios.get(urlEndpoint.fontsAi);

      const [
        brandResponse,
        pagesResponse,
        elementsResponse,
        colorsResponse,
        fontsResponse,
      ] = await Promise.all([
        brandPromise,
        pagesPromise,
        elementsPromise,
        colorsPromise,
        fontsPromise,
      ]);

      setDataBrands(brandResponse.data.data);
      setDataPages(pagesResponse.data.data);
      setDataElements(elementsResponse.data.data);
      setDataColors(colorsResponse.data.data);
      setDataFonts(fontsResponse.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAiBuilder(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchDataAiBuilder();
    }
  }, [token, fetchDataAiBuilder]);

  const contextValue = useMemo(
    () => ({
      dataBrands,
      dataPages,
      dataElements,
      dataColors,
      dataFonts,
      initialPageId,
      currentPageId,
      setCurrentPageId,
      token,
      user,
      isLoadingAiBuilder,
      setAiBuilderLoader,
    }),
    [
      token,
      user,
      dataBrands,
      dataPages,
      dataElements,
      dataColors,
      dataFonts,
      initialPageId,
      currentPageId,
      setCurrentPageId,
      isLoadingAiBuilder,
      setAiBuilderLoader,
    ]
  );

  return (
    <AiBuilderContext.Provider value={contextValue}>
      {isLoadingAiBuilder && <LoaderProgress />}
      {children}
    </AiBuilderContext.Provider>
  );
};

AiBuilderProvider.propTypes = {
  children: PropTypes.node,
};

export const useAiBuilder = () => {
  return useContext(AiBuilderContext);
};
