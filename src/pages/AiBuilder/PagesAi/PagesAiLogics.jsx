import { useState, useEffect, useCallback, useMemo } from "react";
import { useAiBuilder } from "../../../components/AiBuilderSupport/AiBuilderContext";

function PagesAiLogics() {
  const [activePages, setActivePages] = useState([
    "2bff7888-e861-4341-869b-189af29ad3f8",
    "40229892-a523-4e1f-a936-a3051e9d30bb",
  ]);

  const { initialPageId, currentPageId, setCurrentPageId } = useAiBuilder();

  const handleActivePage = useCallback(
    (pageId) => {
      if (
        pageId === "2bff7888-e861-4341-869b-189af29ad3f8" ||
        pageId === "40229892-a523-4e1f-a936-a3051e9d30bb"
      ) {
        return;
      }

      setActivePages((prevActivePages) => {
        let updatedPages;

        if (prevActivePages.includes(pageId)) {
          // Hapus halaman berdasarkan id
          updatedPages = prevActivePages.filter((id) => id !== pageId);

          if (currentPageId === pageId) {
            // Tentukan halaman baru jika halaman yang aktif dinonaktifkan
            const newPageId =
              updatedPages.find(
                (id) =>
                  id !== "2bff7888-e861-4341-869b-189af29ad3f8" &&
                  id !== "40229892-a523-4e1f-a936-a3051e9d30bb"
              ) ?? initialPageId;

            const onlyNavbarAndFooterActive =
              updatedPages.length === 2 &&
              updatedPages.includes("2bff7888-e861-4341-869b-189af29ad3f8") &&
              updatedPages.includes("40229892-a523-4e1f-a936-a3051e9d30bb");

            setCurrentPageId(
              onlyNavbarAndFooterActive ? initialPageId : newPageId
            );
          }
        } else {
          // Tambahkan halaman berdasarkan id
          updatedPages = [...prevActivePages, pageId];
          setCurrentPageId(pageId);
        }

        return updatedPages.sort((a, b) => a - b);
      });
    },
    [currentPageId]
  );

  return { activePages, handleActivePage };
}

export default PagesAiLogics;