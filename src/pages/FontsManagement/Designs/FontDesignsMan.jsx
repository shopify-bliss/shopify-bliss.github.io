import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
// import FontFamiliesModal from "./FontDesignsModal";
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
                              <span
                                className={`item-action-group ${
                                  data.group === 1 ? "one" : "two"
                                }`}
                              >
                                <span className="material-symbols-outlined item-action-icon">
                                  format_size
                                </span>
                                <div className="text">
                                  {data.group === 1 ? "Alpha" : "Beta"}
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
                    ) : (
                      <div className="two">Beta</div>
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
  const [brands, setBrands] = useState([]);

  const { isLoadingDashboard, setDashboardLoader, token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchFontsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.fontsAi);

      console.log(response.data.data);

      setFontDesigns(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, []);

  const fetchBrandsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.brandsAi);

      console.log(response.data.data);

      setBrands(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchFontsData();
    fetchBrandsData();
  }, [fetchFontsData, fetchBrandsData]);

  return (
    <>
      <div className="font-designs-man">
        <Header
          className="font-designs-man"
          title="Font Designs Management — Fonts"
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
        {/* <FontFamiliesModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchFontsData}
        />
        <FontFamiliesModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchFontsData}
          fontDesignId={fontDesignId}
        />
        <FontFamiliesModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchFontsData}
          fontDesignId={fontDesignId}
        /> */}
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
