import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import FontFamiliesModal from "./FontFamiliesModal";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import PropTypes from "prop-types";
import { AllFonts } from "../../../components/AiBuilderSupport/FontsSupport";

function DisplayView({
  isLoadingDashboard,
  fonts,
  setFontId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="fonts-man-grid">
          {fonts
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((data) => {
              const fontFamily = AllFonts({ fontId: data.font_id });

              return (
                <div className="item" key={data.font_id}>
                  <div className="item-name">{data.name}</div>
                  <div className={`item-samples ${fontFamily}`}>
                    AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890
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
                      className="material-symbols-rounded item-action-edit"
                      onClick={() => {
                        setIsUpdateModalOpen(true);
                        setFontId(data.font_id);
                      }}
                    >
                      edit_square
                    </span>
                    <span
                      className="material-symbols-rounded item-action-delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setFontId(data.font_id);
                      }}
                    >
                      delete
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="fonts-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Sample</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {fonts
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((data, index) => {
              const fontFamily = AllFonts({ fontId: data.font_id });

              return (
                <div className="body" key={data.font_id}>
                  <div className="body-col">{index + 1}</div>
                  <div className="body-col">{data.name}</div>
                  <div className={`body-col`}>
                    <div className={`uppercase ${fontFamily}`}>
                      abcdefghijklmnopqrstuvwxyz12345
                    </div>
                    <div className={`lowercase ${fontFamily}`}>
                      abcdefghijklmnopqrstuvwxyz67890
                    </div>
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
                        setFontId(data.font_id);
                      }}
                    >
                      edit_square
                    </span>
                    <span
                      className="material-symbols-rounded delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setFontId(data.font_id);
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

function FontFamilies() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fontId, setFontId] = useState(null);
  const [fonts, setFonts] = useState([]);

  const { isLoadingDashboard, setDashboardLoader, token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

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
  }, [token]);

  useEffect(() => {
    fetchFontsData();
  }, [fetchFontsData]);

  return (
    <>
      <div className="fonts-man">
        <Header
          className="fonts-man"
          title="Font Families Management — Fonts"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            fonts={fonts}
            setFontId={setFontId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            fonts={fonts}
            setFontId={setFontId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <FontFamiliesModal
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
          fontId={fontId}
        />
        <FontFamiliesModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchFontsData}
          fontId={fontId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  type: PropTypes.string,
  fonts: PropTypes.array,
  setFontId: PropTypes.func,
  isLoadingDashboard: PropTypes.bool,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
};

export default FontFamilies;
