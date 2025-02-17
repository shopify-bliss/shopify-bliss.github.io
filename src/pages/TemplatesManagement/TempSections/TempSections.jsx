import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import TempPagesModal from "./TempSectionsModal";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import PropTypes from "prop-types";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";

function DisplayView({
  isLoadingTempSections,
  sections,
  setSectionId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingTempSections && <LoaderPages />}
      {type === "grid" ? (
        <div className="temp-sections-grid">
          {sections
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((data) => (
              <div className="item" key={data.section_id}>
                <div className="item-name">{data.name}</div>
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
                      setSectionId(data.section_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded item-action-delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSectionId(data.section_id);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="temp-sections-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {sections
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((data, index) => (
              <div className="body" key={data.section_id}>
                <div className="body-col">{index + 1}</div>
                <div className="body-col">{data.name}</div>
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
                      setSectionId(data.section_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSectionId(data.section_id);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

function TempSections() {
  axios.defaults.withCredentials = true;
  const [sections, setSections] = useState([]);
  const [isLoadingTempSections, setIsLoadingTempSections] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sectionId, setSectionId] = useState(null);

  const { token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchSections = useCallback(async () => {
    setIsLoadingTempSections(true);

    try {
      const response = await axios.get(urlEndpoint.elementsAi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data.data);

      setSections(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingTempSections(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <>
      <div className="temp-sections">
        <Header
          className="temp-sections"
          title="Template Management — Sections"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingTempSections={isLoadingTempSections}
            sections={sections}
            setSectionId={setSectionId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingTempSections={isLoadingTempSections}
            sections={sections}
            setSectionId={setSectionId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <TempPagesModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchSections}
        />
        <TempPagesModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchSections}
          sectionId={sectionId}
        />
        <TempPagesModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchSections}
          sectionId={sectionId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  isLoadingTempSections: PropTypes.bool,
  sections: PropTypes.array,
  setSectionId: PropTypes.func,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
  type: PropTypes.string,
};

export default TempSections;
