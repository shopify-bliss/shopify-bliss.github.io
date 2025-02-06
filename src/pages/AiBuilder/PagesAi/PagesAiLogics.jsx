import { useState, useCallback } from "react";
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

        // Pastikan "a2d56bd2-c5fc-4404-9c3f-5977a88a6625" selalu di index pertama
        const specialId = "a2d56bd2-c5fc-4404-9c3f-5977a88a6625";
        if (updatedPages.includes(specialId)) {
          updatedPages = [
            specialId,
            ...updatedPages.filter((id) => id !== specialId),
          ];
        }

        return updatedPages;
      });
    },
    [currentPageId, initialPageId, setCurrentPageId]
  );

  return { activePages, handleActivePage };
}

export default PagesAiLogics;
