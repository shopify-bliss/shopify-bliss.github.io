import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import PropTypes from "prop-types";
import {
  AllFonts,
  AllFontType1,
  AllFontType2,
} from "../../../components/AiBuilderSupport/FontsSupport";

function DisplayView({
  isLoadingDashboard,
  colorDesigns,
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
        <div className="color-designs-man-grid">
          {brands
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((brand) => {
              return (
                <div className="color-brands" key={brand.brand_id}>
                  <div className="color-brands-text">{brand.name}</div>
                  <div className="color-brands-item">
                    {colorDesigns
                      .filter((color) => color.brand_id === brand.brand_id)
                      .filter((data) => {
                        const searchLowerCase = search.toLowerCase();

                        return (
                          data.color1.color
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                          data.color2.color
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                          data.color3.color
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                          data.brands.name
                            .toLowerCase()
                            .includes(searchLowerCase)
                        );
                      })
                      .map((data) => {
                        return (
                          <div className="item" key={data.color_designs_id}>
                            <span className="item-name">
                              <span
                                className={`color-special-${data.color1.color}`}
                              ></span>
                              <span
                                className={`color-other-${data.color2.color}`}
                              ></span>
                              <span
                                className={`color-bg-${data.color3.color}`}
                              ></span>
                            </span>
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
                                className="material-symbols-rounded item-action-edit"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setFontDesignId(data.color_designs_id);
                                }}
                              >
                                edit_square
                              </span>
                              <span
                                className="material-symbols-rounded item-action-delete"
                                onClick={() => {
                                  setIsDeleteModalOpen(true);
                                  setFontDesignId(data.color_designs_id);
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
        <div className="color-designs-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Brand</div>
            <div className="head-col">Color 1</div>
            <div className="head-col">Color 2</div>
            <div className="head-col">Color 3</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {colorDesigns
            // .filter((data) => {
            //   const searchLowerCase = search.toLowerCase();

            //   return (
            //     data.brands.name.toLowerCase().includes(searchLowerCase) ||
            //     data.color1.name.toLowerCase().includes(searchLowerCase) ||
            //     data.color2.name.toLowerCase().includes(searchLowerCase) ||
            //     data.group.toLowerCase().includes(searchLowerCase)
            //   );
            // })
            .map((data, index) => {
              return (
                <div className="body" key={data.color_designs_id}>
                  <div className="body-col">{index + 1}</div>

                  <div className="body-col">{data.brands.name}</div>
                  <div className={`body-col`}>
                    <span
                      className={`color-special-${data.color1.color}`}
                    ></span>
                  </div>
                  <div className={`body-col`}>
                    <span className={`color-other-${data.color2.color}`}></span>
                  </div>
                  <div className={`body-col`}>
                    <span className={`color-bg-${data.color3.color}`}></span>
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
                        setFontDesignId(data.color_designs_id);
                      }}
                    >
                      edit_square
                    </span>
                    <span
                      className="material-symbols-rounded delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setFontDesignId(data.color_designs_id);
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

function ColorDesigns() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colorDesignId, setFontDesignId] = useState(null);
  const [colorDesigns, setFontDesigns] = useState([]);
  const [colors, setFonts] = useState([]);
  const [brands, setBrands] = useState([]);

  const { isLoadingDashboard, setDashboardLoader, token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchFontDesignsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.colorsAi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data);

      setFontDesigns(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token]);

  const fetchFontsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.colors, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data);

      setFonts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token]);

  const fetchBrandsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.brandsAi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data);

      setBrands(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFontsData();
    fetchBrandsData();
    fetchFontDesignsData();
  }, [fetchFontDesignsData, fetchBrandsData, fetchFontsData]);

  return (
    <>
      <div className="color-designs-man">
        <Header
          className="color-designs-man"
          title="Colors Management — Color Designs"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            colorDesigns={colorDesigns}
            brands={brands}
            setFontDesignId={setFontDesignId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            colorDesigns={colorDesigns}
            brands={brands}
            setFontDesignId={setFontDesignId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        {/* <FontDesignsModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchFontDesignsData}
          brands={brands}
          colors={colors}
        />
        <FontDesignsModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchFontDesignsData}
          colorDesignId={colorDesignId}
          brands={brands}
          colors={colors}
        />
        <FontDesignsModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchFontDesignsData}
          colorDesignId={colorDesignId}
        /> */}
      </div>
    </>
  );
}

DisplayView.propTypes = {
  type: PropTypes.string,
  colorDesigns: PropTypes.array,
  brands: PropTypes.array,
  setFontDesignId: PropTypes.func,
  isLoadingDashboard: PropTypes.bool,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
};

export default ColorDesigns;
