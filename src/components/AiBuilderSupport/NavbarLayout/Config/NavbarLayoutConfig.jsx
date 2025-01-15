import React, { useCallback, useMemo, Fragment } from "react";

export function useDisplaySiteTitle({ siteTitle }) {
  const displaySiteTitle = useMemo(
    () => (siteTitle?.trim() ? siteTitle : "Title Your Site"),
    [siteTitle]
  );

  return displaySiteTitle;
}

export function useDisplayLogo({ dataPages, displaySiteTitle }) {
  const displayLogo = useMemo(() => {
    const logo = dataPages.find(
      (page) =>
        page?.type_template_id === "2bff7888-e861-4341-869b-189af29ad3f8"
    );

    return (
      <>
        <span className="material-symbols-outlined">{logo?.icon}</span>
        <div className="title">{displaySiteTitle}</div>
      </>
    );
  }, [dataPages, displaySiteTitle]);

  return displayLogo;
}

export function useDisplayActivePages({
  activePages,
  dataPages,
  currentPageId,
  setCurrentPageId,
  isPreview,
}) {
  const displayActivePages = activePages
    .filter(
      (id) =>
        ![
          "2bff7888-e861-4341-869b-189af29ad3f8",
          "40229892-a523-4e1f-a936-a3051e9d30bb",
        ].includes(id)
    )
    .map((id) => {
      const page = dataPages.find((page) => page?.type_template_id === id);
      const isActive = currentPageId === id;

      return (
        <div
          className={`text ${isActive ? "active" : ""}`}
          key={id}
          onClick={() =>
            isPreview ? setCurrentPageId(page.type_template_id) : null
          }
        >
          {page?.type.replace(/ page$/i, "")}
        </div>
      );
    });

  return displayActivePages;
}

export function useHandleActiveFeatures({ setActiveFeatures }) {
  const handleActiveFeatures = useCallback((featureId) => {
    setActiveFeatures((prevActiveFeatures) => {
      return prevActiveFeatures.includes(featureId)
        ? prevActiveFeatures.filter((id) => id !== featureId)
        : [...prevActiveFeatures, featureId];
    });
  }, []);

  return handleActiveFeatures;
}

export function useDisplayActiveFeatures({ activeFeatures, navbarFeatures }) {
  const filteredFeaturesMap = useMemo(() => {
    const filterByCondition = (condition) =>
      navbarFeatures.filter(
        (feature) => condition(feature) && activeFeatures.includes(feature.id)
      );

    return {
      "no-1": filterByCondition(
        (feature) => feature.id !== 1 && [2, 3].includes(feature.id)
      ),
      all: filterByCondition(() => true),
      "just-1": filterByCondition((feature) => feature.id === 1),
    };
  }, [activeFeatures, navbarFeatures]);

  const displayActiveFeatures = (howId) => {
    const filteredFeatures = filteredFeaturesMap[howId] || [];

    if (filteredFeatures.length === 0) {
      return (
        <>
          <span className="material-symbols-outlined warn">warning</span>
          <span>No features available</span>
        </>
      );
    }

    switch (howId) {
      case "no-1":
        return filteredFeatures.map((feature) => (
          <span
            key={feature.id}
            className={`material-symbols-outlined ${feature.className}`}
          >
            {feature.icon}
          </span>
        ));

      case "all":
        return filteredFeatures.map((feature) => (
          <span key={feature.id} className="material-symbols-outlined">
            {feature.icon}
          </span>
        ));

      case "just-1":
        return filteredFeatures.map((feature) => (
          <Fragment key={feature.id}>
            <span className={`material-symbols-outlined ${feature.className}`}>
              {feature.icon}
            </span>
            <input type="text" placeholder="Search here..." />
          </Fragment>
        ));

      default:
        return <span>Invalid howId</span>;
    }
  };

  return displayActiveFeatures;
}

export function ExpalotNavbarFeatures({
  navbarFeatures,
  activeFeatures,
  handleActiveFeatures,
}) {
  return navbarFeatures.map((feature) => {
    return (
      <div
        className="feature"
        key={feature.id}
        onClick={() => handleActiveFeatures(feature.id)}
      >
        {activeFeatures.includes(feature.id) ? (
          <>
            <span className="material-symbols-outlined active">task_alt</span>
            <div className="text active">{feature.name}</div>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">
              radio_button_unchecked
            </span>
            <div className="text">{feature.name}</div>
          </>
        )}
      </div>
    );
  });
}

export function ExpalotNavbarStyles({
  layoutIds,
  navbarOptionLayout,
  activeNavbar,
  handleActiveNavbar,
  displayLogo,
  displayActivePages,
  displayActiveFeatures,
  activeFeatures,
}) {
  return navbarOptionLayout
    .filter((item) => layoutIds.includes(item.id))
    .map((layout) => (
      <div
        key={layout.id}
        className={`${layout.className} ${
          activeNavbar === layout.id ? "active" : ""
        }`}
        onClick={() => handleActiveNavbar(layout.id)}
      >
        <div className="template-logo">{displayLogo}</div>

        {layout.id === 3 ? (
          <>
            <div className="template-wrapper">
              <div
                className={`template-search ${
                  activeFeatures.includes(1) ? "active" : ""
                }`}
              >
                {displayActiveFeatures("just-1")}
              </div>
              <div className="template-links">{displayActivePages}</div>
            </div>
          </>
        ) : (
          <div className="template-links">{displayActivePages}</div>
        )}

        {layout.features && (
          <div className="template-features">
            {displayActiveFeatures(layout.features)}
          </div>
        )}
      </div>
    ));
}
