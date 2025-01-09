import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import TempPagesModal from "./TempSectionsModal";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";

function DisplayView({
  isLoadingTempSections,
  sections,
  setSectionId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingTempSections && <LoaderPages />}
      {type === "grid" ? (
        <div className="temp-sections-grid">
          {sections.map((data) => (
            <div className="item" key={data.section_id}>
              <div className="item-name">{data.name}</div>
              <div className="item-action">
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
            <div className="head-col">Action</div>
          </div>
          {sections.map((data, index) => (
            <div className="body" key={data.section_id}>
              <div className="body-col">{index + 1}</div>
              <div className="body-col">{data.name}</div>
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

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchSections = useCallback(async () => {
    setIsLoadingTempSections(true);

    try {
      const response = await axios.get(urlEndpoint.elementsAi);

      setSections(response.data.data);
      setIsLoadingTempSections(false);
    } catch (error) {
      console.error(error);
      setIsLoadingTempSections(false);
    } finally {
      setIsLoadingTempSections(false);
    }
  }, [urlEndpoint.elementsAi]);

  useEffect(() => {
    fetchSections();
  }, []);

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

export default TempSections;
