import { useState, useEffect, useCallback } from "react";

function SiteInfoLogics({ dataBrands }) {
  const [activeBrand, setActiveBrand] = useState({});
  const [siteTitle, setSiteTitle] = useState("");
  const maxChars = 60;

  useEffect(() => {
    if (dataBrands.length > 0) {
      setActiveBrand(dataBrands[0]);
    }
  }, [dataBrands]);

  const handleBrandClick = useCallback(
    (brandId) => {
      const selectedBrand = dataBrands.find(
        (brand) => brand.brand_id === brandId
      );

      if (selectedBrand) {
        setActiveBrand(selectedBrand);
      }
    },
    [dataBrands]
  );

  const handleSiteTitleInput = useCallback((e) => {
    const inputSiteTitle = e.target.value;
    if (inputSiteTitle.length <= maxChars) {
      setSiteTitle(inputSiteTitle);
    }
  }, []);

  return {
    siteTitle,
    maxChars,
    handleSiteTitleInput,
    activeBrand,
    handleBrandClick,
  };
}

export default SiteInfoLogics;
