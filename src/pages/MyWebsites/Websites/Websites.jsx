import { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { indonesianTime } from "../../../helpers/IndonesianTime";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";

function Websites() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [websites, setWebsites] = useState([]);
  const [websiteId, setWebsiteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const modalRef = useRef(null);
  const statusDelete = useRef(null);

  const { isLoadingDashboard, setDashboardLoader, token, toastPromise } =
    useDashboard();
  const { search } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenDelete(false);
      }

      if (openDelete) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  }, [modalRef, openDelete]);

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchWebData = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.aiBuilderUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data.data);

      setWebsites(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token, setDashboardLoader]);

  useEffect(() => {
    fetchWebData();
  }, [fetchWebData]);

  const handleDeleteWebsite = useCallback(
    (e) => {
      e.preventDefault();

      const promise = axios.delete(urlEndpoint.aiBuilder, {
        params: {
          id: websiteId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      promise.then((res) => {
        statusDelete.current = res.data.success;
      });

      toastPromise(
        promise,
        {
          pending: "Deleting website on progress...",
          success: "Website has been deleted",
          error: "Failed to delete website",
        },
        { position: "top-center" },
        () => {
          if (statusDelete.current === true) {
            fetchWebData();
            setOpenDelete(false);
          }
        }
      );
    },
    [token, fetchWebData, toastPromise, websiteId, statusDelete]
  );

  return (
    <>
      <div className="websites">
        {isLoadingDashboard && <LoaderPages />}
        <Header
          className="websites"
          title="My Websites — Websites"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          forClient={"website"}
        />
        <div className="websites-list">
          {websites
            .filter((website) => {
              const slug = website.site_title.toLowerCase().replace(/ /g, "-");

              return (
                website.site_title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                slug.includes(search.toLowerCase())
              );
            })
            .map((website) => {
              const image = "/intro/pexels-heyho-7535030.jpg";
              const slug = website.site_title.toLowerCase().replace(/ /g, "-");

              return (
                <div className="websites-item" key={website.ai_builder_id}>
                  <img
                    className="websites-item-image"
                    src={image}
                    alt="image's website"
                  />

                  <div className="websites-item-wrapper">
                    <div className="websites-item-wrapper-name">
                      {website.site_title}
                    </div>
                    <div className="websites-item-wrapper-time">
                      {indonesianTime(website.created_at)}
                    </div>
                  </div>

                  <div className="websites-item-slug">{slug}</div>
                  <div className="websites-item-actions">
                    <span
                      className="material-symbols-rounded websites-item-actions-edit"
                      onClick={() =>
                        navigate(`/preview/${slug}`, {
                          state: { aiBuilderId: website.ai_builder_id },
                        })
                      }
                    >
                      captive_portal
                    </span>
                    <span
                      className="material-symbols-rounded websites-item-actions-delete"
                      onClick={() => {
                        setOpenDelete(true);
                        setWebsiteId(website.ai_builder_id);
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
      {openDelete ? (
        <Modal
          onClose={() => setOpenDelete(false)}
          onOpen={openDelete}
          type="confirm"
          titleModal={"Are you sure you want to delete this?"}
          descModal={
            "Your content will be permanently deleted. This can't be undone."
          }
        >
          <div className="confirm-dashboard-action">
            <div className="cancel" onClick={() => setOpenDelete(false)}>
              cancel
            </div>
            <div className="confirm" onClick={handleDeleteWebsite}>
              delete
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default Websites;
