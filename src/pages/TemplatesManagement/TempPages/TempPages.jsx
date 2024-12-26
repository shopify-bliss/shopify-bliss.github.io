import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import TempPagesModal from "./TempPagesModal";

function DisplayView({
  isLoadingTempPages,
  pages,
  setPageId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingTempPages && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="temp-pages-grid">
          {pages.map((data) => (
            <div className="item" key={data.type_template_id}>
              <span className="material-symbols-rounded item-icon">
                {data.icon}
              </span>
              <div className="item-name">{data.type}</div>
              <div className="item-action">
                <span
                  className="material-symbols-rounded item-action-edit"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setPageId(data.type_template_id);
                  }}
                >
                  edit_square
                </span>
                <span
                  className="material-symbols-rounded item-action-delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setPageId(data.type_template_id);
                  }}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="temp-pages-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Icon</div>
            <div className="head-col">Google Material Icon</div>
            <div className="head-col">Name</div>
            <div className="head-col">Action</div>
          </div>
          {pages.map((data, index) => (
            <div className="body" key={data.type_template_id}>
              <dic className="body-col">{index + 1}</dic>
              <span className="material-symbols-rounded body-col">
                {data.icon}
              </span>
              <div className="body-col">{data.icon}</div>
              <div className="body-col">{data.type}</div>
              <div className="body-col">
                <span
                  className="material-symbols-rounded edit"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setPageId(data.type_template_id);
                  }}
                >
                  edit_square
                </span>
                <span
                  className="material-symbols-rounded delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setPageId(data.type_template_id);
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

function TempPages() {
  axios.defaults.withCredentials = true;
  const [pages, setPages] = useState([]);
  const [isLoadingTempPages, setIsLoadingTempPages] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pageId, setPageId] = useState(null);

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchPages = useCallback(async () => {
    setIsLoadingTempPages(true);

    try {
      const response = await axios.get(urlEndpoint.pagesAi);

      setPages(response.data.data);
      setIsLoadingTempPages(false);
    } catch (error) {
      console.error(error);
      setIsLoadingTempPages(false);
    } finally {
      setIsLoadingTempPages(false);
    }
  }, [urlEndpoint]);

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <>
      <div className="temp-pages">
        <Header
          className="temp-pages"
          title="Template Management — Pages"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingTempPages={isLoadingTempPages}
            pages={pages}
            setPageId={setPageId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingTempPages={isLoadingTempPages}
            pages={pages}
            setPageId={setPageId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <TempPagesModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchPages}
        />
        <TempPagesModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchPages}
          pageId={pageId}
        />
        <TempPagesModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchPages}
          pageId={pageId}
        />
      </div>
    </>
  );
}

export default TempPages;
