import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import ColorHexsModal from "./ColorHexsModal";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import PropTypes from "prop-types";

function DisplayView({
  isLoadingDashboard,
  colors,
  setColorId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="colors-man-grid">
          {colors
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.color.toLowerCase().includes(searchLowerCase);
            })
            .map((data) => {
              return (
                <div className="item" key={data.color_id}>
                  <div
                    className={`item-samples`}
                    style={{
                      backgroundColor: `#${data.color}`,
                    }}
                  ></div>
                  <div className="item-hex">{data.color}</div>
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
                        setColorId(data.color_id);
                      }}
                    >
                      edit_square
                    </span>
                    <span
                      className="material-symbols-rounded item-action-delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setColorId(data.color_id);
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
        <div className="colors-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Color</div>
            <div className="head-col">Sample</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {colors
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.color.toLowerCase().includes(searchLowerCase);
            })
            .map((data, index) => {
              return (
                <div className="body" key={data.color_id}>
                  <div className="body-col">{index + 1}</div>
                  <div className="body-col">{data.color}</div>
                  <div className="body-col">
                    <span
                      className={`body-col-box`}
                      style={{ backgroundColor: `#${data.color}` }}
                    ></span>
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
                        setColorId(data.color_id);
                      }}
                    >
                      edit_square
                    </span>
                    <span
                      className="material-symbols-rounded delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setColorId(data.color_id);
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

function ColorHexs() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colorId, setColorId] = useState(null);
  const [colors, setColors] = useState([]);

  const { isLoadingDashboard, setDashboardLoader, token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchColorsData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.colors, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setColors(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token]);

  useEffect(() => {
    fetchColorsData();
  }, [fetchColorsData]);

  return (
    <>
      <div className="colors-man">
        <Header
          className="colors-man"
          title="Color Hexs Management — Colors"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            colors={colors}
            setColorId={setColorId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            colors={colors}
            setColorId={setColorId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <ColorHexsModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchColorsData}
        />
        <ColorHexsModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchColorsData}
          colorId={colorId}
        />
        <ColorHexsModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchColorsData}
          colorId={colorId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  type: PropTypes.string,
  colors: PropTypes.array,
  setColorId: PropTypes.func,
  isLoadingDashboard: PropTypes.bool,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
};

export default ColorHexs;
