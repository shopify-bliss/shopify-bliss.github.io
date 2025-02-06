import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import TempBrandsModal from "./TempBrandsModal";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import PropTypes from "prop-types";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";

function DisplayView({
  isLoadingTempBrands,
  brands,
  setBrandId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingTempBrands && <LoaderPages />}
      {type === "grid" ? (
        <div className="temp-brands-grid">
          {brands
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((data) => (
              <div className="item" key={data.brand_id}>
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
                      setBrandId(data.brand_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded item-action-delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setBrandId(data.brand_id);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="temp-brands-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {brands
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return data.name.toLowerCase().includes(searchLowerCase);
            })
            .map((data, index) => (
              <div className="body" key={data.brand_id}>
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
                      setBrandId(data.brand_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setBrandId(data.brand_id);
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

function TempBrands() {
  axios.defaults.withCredentials = true;
  const [brands, setBrands] = useState([]);
  const [isLoadingTempBrands, setIsLoadingTempBrands] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [brandId, setBrandId] = useState(null);

  const { token } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchBrands = useCallback(async () => {
    setIsLoadingTempBrands(true);

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
      setIsLoadingTempBrands(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <>
      <div className="temp-brands">
        <Header
          className="temp-brands"
          title="Template Management — Brands"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingTempBrands={isLoadingTempBrands}
            brands={brands}
            setBrandId={setBrandId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingTempBrands={isLoadingTempBrands}
            brands={brands}
            setBrandId={setBrandId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <TempBrandsModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchBrands}
        />
        <TempBrandsModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchBrands}
          brandId={brandId}
        />
        <TempBrandsModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchBrands}
          brandId={brandId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  isLoadingTempBrands: PropTypes.bool,
  brands: PropTypes.array,
  setBrandId: PropTypes.func,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
  type: PropTypes.string,
};

export default TempBrands;
