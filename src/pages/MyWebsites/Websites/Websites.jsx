import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { indonesianTime } from "../../../helpers/IndonesianTime";
import { useNavigate } from "react-router-dom";

function Websites() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [websites, setWebsites] = useState([]);

  const { isLoadingDashboard, setDashboardLoader, token } = useDashboard();

  const navigate = useNavigate();

  const { search } = useSearch();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchFontsData = useCallback(async () => {
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
    fetchFontsData();
  }, [fetchFontsData]);

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
                    <span className="material-symbols-rounded websites-item-actions-delete">
                      delete
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Websites;
