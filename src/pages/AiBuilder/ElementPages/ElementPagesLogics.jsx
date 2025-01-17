import { useState, useEffect, useCallback } from "react";
import { useAiBuilder } from "../../../components/AiBuilderSupport/AiBuilderContext";

function ElementPagesLogics() {
  const [activeSections, setActiveSections] = useState({});
  const { currentPageId, initialPageId } = useAiBuilder();

  const handleActiveSection = useCallback(
    (sectionId) => {
      setActiveSections((prevActiveSections) => {
        const currentSections = prevActiveSections[currentPageId] || [];
        let updatedSections;

        if (currentSections.includes(sectionId)) {
          // Hapus section
          updatedSections = currentSections.filter((id) => id !== sectionId);
        } else {
          // Tambahkan section
          updatedSections = [...currentSections, sectionId];
        }

        return {
          ...prevActiveSections,
          [currentPageId]: updatedSections,
        };
      });
    },
    [currentPageId]
  );

  useEffect(() => {
    if (currentPageId !== initialPageId) {
      setActiveSections((prev) => ({
        ...prev,
        [currentPageId]: prev[currentPageId] || [],
      }));
    }
  }, [currentPageId, initialPageId]);

  return { activeSections, handleActiveSection };
}

export default ElementPagesLogics;
