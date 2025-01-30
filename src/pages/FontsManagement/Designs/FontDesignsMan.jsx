import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import FontDesignsModal from "./FontDesignsModal";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import PropTypes from "prop-types";
import {
  AllFontType1,
  AllFontType2,
} from "../../../components/AiBuilderSupport/FontsSupport";

function DisplayView({
  isLoadingDashboard,
  fontDesigns,
  brands,
  setFontDesignId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="font-designs-man-grid">
          {brands
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((brand) => {
              return (
                <div className="font-brands" key={brand.brand_id}>
                  <div className="font-brands-text">{brand.name}</div>
                  <div className="font-brands-item">
                    {fontDesigns
                      .filter((font) => font.brand_id === brand.brand_id)
                      .filter((data) => {
                        const searchLowerCase = search.toLowerCase();

                        return (
                          data.font1.name
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                          data.font2.name
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                          data.brands.name
                            .toLowerCase()
                            .includes(searchLowerCase)
                        );
                      })
                      .map((data) => {
                        const fontType1 = AllFontType1({
                          brand: data.brand_id,
                          group: data.group,
                        });

                        const fontType2 = AllFontType2({
                          brand: data.brand_id,
                          group: data.group,
                        });

                        return (
                          <div className="item" key={data.font_designs_id}>
                            <div className={`item-name ${fontType1}`}>
                              {data.font1.name}
                            </div>
                            <div className={`item-name ${fontType2}`}>
                              {data.font2.name}
                            </div>
                            <div className="item-action">
                              {data.is_develope === true ? (
                                <span className="item-action-progress">
                                  <span className="material-symbols-outlined item-action-icon">
                                    sync
                                  </span>
                                  <div className="text">Progress</div>
                                </span>
                              ) : null}
                              <span
                                className={`item-action-group ${
                                  data.group === 1
                                    ? "one"
                                    : data.group === 2
                                    ? "two"
                                    : "before"
                                }`}
                              >
                                <span className="material-symbols-outlined item-action-icon">
                                  format_size
                                </span>
                                <div className="text">
                                  {data.group === 1
                                    ? "Alpha"
                                    : data.group === 2
                                    ? "Beta"
                                    : "Before"}
                                </div>
                              </span>
                              <span
                                className="material-symbols-rounded item-action-edit"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setFontDesignId(data.font_designs_id);
                                }}
                              >
                                edit_square
                              </span>
                              <span
                                className="material-symbols-rounded item-action-delete"
                                onClick={() => {
                                  setIsDeleteModalOpen(true);
                                  setFontDesignId(data.font_designs_id);
                                }}
                              >
                                delete
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="font-designs-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Brand</div>
            <div className="head-col">Font 1</div>
            <div className="head-col">Font 2</div>
            <div className="head-col">Group</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {fontDesigns
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.brands.name.toLowerCase().includes(searchLowerCase) ||
                data.font1.name.toLowerCase().includes(searchLowerCase) ||
                data.font2.name.toLowerCase().includes(searchLowerCase) ||
                data.group.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data, index) => {
              const fontType1 = AllFontType1({
                brand: data.brand_id,
                group: data.group,
              });

              const fontType2 = AllFontType2({
                brand: data.brand_id,
                group: data.group,
              });

              return (
                <div className="body" key={data.font_designs_id}>
                  <div className="body-col">{index + 1}</div>
                  <div className="body-col">{data.brands.name}</div>
                  <div className={`body-col ${fontType1}`}>
                    {data.font1.name}
                  </div>
                  <div className={`body-col ${fontType2}`}>
                    {data.font2.name}
                  </div>
                  <div className="body-col">
                    {data.group === 1 ? (
                      <div className="one">Alpha</div>
                    ) : data.group === 2 ? (
                      <div className="two">Beta</div>
                    ) : (
                      <div className="before">Before</div>
                    )}
                  </div>
                  <div className="body-col">
                    {data.is_develope === true ? (
                      <span className="progress">Progress</span>
                    ) : (
                      <span className="done">Done</span>
                    )}
                  </div>
                  <div className="body-col">
                    <span
                      className="material-symbols-rounded edit"
                      onClick={() => {
                        setIsUpdateModalOpen(true);
                        setFontDesignId(data.font_designs_id);
                      }}
                    >
                      edit_square
                    </span>
                    <span
                      className="material-symbols-rounded delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setFontDesignId(data.font_designs_id);
                      }}
                    >
                      delete
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

function FontDesigns() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fontDesignId, setFontDesignId] = useState(null);
  const [fontDesigns, setFontDesigns] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [brands, setBrands] = useState([]);

  const { isLoadingDashboard, setDashboardLoader, token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchFontDesignsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.fontsAi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFontDesigns(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token, setDashboardLoader]);

  const fetchFontsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.fonts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFonts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token, setDashboardLoader]);

  const fetchBrandsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.brandsAi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBrands(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token, setDashboardLoader]);

  useEffect(() => {
    fetchFontsData();
    fetchBrandsData();
    fetchFontDesignsData();
  }, [fetchFontDesignsData, fetchBrandsData, fetchFontsData]);

  return (
    <>
      <div className="font-designs-man">
        <Header
          className="font-designs-man"
          title="Fonts Management — Font Designs"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            fontDesigns={fontDesigns}
            brands={brands}
            setFontDesignId={setFontDesignId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            fontDesigns={fontDesigns}
            brands={brands}
            setFontDesignId={setFontDesignId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <FontDesignsModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchFontDesignsData}
          brands={brands}
          fonts={fonts}
        />
        <FontDesignsModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchFontDesignsData}
          fontDesignId={fontDesignId}
          brands={brands}
          fonts={fonts}
        />
        <FontDesignsModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchFontDesignsData}
          fontDesignId={fontDesignId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  type: PropTypes.string,
  fontDesigns: PropTypes.array,
  brands: PropTypes.array,
  setFontDesignId: PropTypes.func,
  isLoadingDashboard: PropTypes.bool,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
};

export default FontDesigns;
