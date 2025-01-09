import React, {
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

const AiBuilderContext = createContext({
  dataBrands: [],
  dataPages: [],
  dataElements: [],
  dataColors: [],
  dataFonts: [],
  initialPageId: 99,
  currentPageId: null,
  setCurrentPageId: () => {},
});

export const AiBuilderProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [dataBrands, setDataBrands] = useState([]);
  const [dataPages, setDataPages] = useState([]);
  const [dataElements, setDataElements] = useState([]);
  const [dataColors, setDataColors] = useState([]);
  const [dataFonts, setDataFonts] = useState([]);
  const [isLoadingAiBuilder, setIsLoadingAiBuilder] = useState(false);
  const initialPageId = 99;
  const [currentPageId, setCurrentPageId] = useState(initialPageId);

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
    fetchDataAiBuilder();
  }, [fetchDataAiBuilder]);

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
    }),
    [
      dataBrands,
      dataPages,
      dataElements,
      dataColors,
      dataFonts,
      initialPageId,
      currentPageId,
      setCurrentPageId,
    ]
  );

  return (
    <AiBuilderContext.Provider value={contextValue}>
      {isLoadingAiBuilder && <LoaderProgress />}
      {children}
    </AiBuilderContext.Provider>
  );
};

export const useAiBuilder = () => {
  return useContext(AiBuilderContext);
};
