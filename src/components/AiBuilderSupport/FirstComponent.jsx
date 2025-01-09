import { useState, useEffect } from "react";

function FirstComponent({ activeSections, currentPageId }) {
  const [firstProduct, setFirstProduct] = useState(false);
  const [firstService, setFirstService] = useState(false);
  const [firstAbout, setFirstAbout] = useState(false);
  const [firstForm, setFirstForm] = useState(false);

  useEffect(() => {
    const toFirstProduct = activeSections[currentPageId].some((section) =>
      section.includes("798f1ce0-b732-45a6-838e-f28e137243f7")
    );
    const toFirstService = activeSections[currentPageId].some((section) =>
      section.includes("b42d4d56-d411-4aa8-ae01-52f0c406328a")
    );
    const toFirstAbout = activeSections[currentPageId].some((section) =>
      section.includes("4fd1e0cc-06f3-4554-9f79-ce8e02db03c8")
    );
    const toFirstForm = activeSections[currentPageId].some((section) =>
      section.includes("1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed")
    );

    if (!toFirstProduct) {
      setFirstProduct(true);
    } else {
      setFirstProduct(false);
    }

    if (!toFirstProduct && !toFirstService) {
      setFirstService(true);
    } else {
      setFirstService(false);
    }

    if (!toFirstProduct && !toFirstService && !toFirstAbout) {
      setFirstAbout(true);
    } else {
      setFirstAbout(false);
    }

    if (!toFirstProduct && !toFirstService && !toFirstAbout && !toFirstForm) {
      setFirstForm(true);
    } else {
      setFirstForm(false);
    }
  }, [activeSections, currentPageId]);

  return { firstProduct, firstService, firstAbout, firstForm };
}

export default FirstComponent;
