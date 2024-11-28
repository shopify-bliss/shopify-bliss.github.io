import React, { createContext, useState } from "react";

export const TransferDataIdContent = createContext(null);

export const TransferDataId = ({ children }) => {
  const [activeId, setActiveId] = useState(null); // Menyimpan ID aktif

  return (
    <TransferDataIdContent.Provider value={{ activeId, setActiveId }}>
      {children}
    </TransferDataIdContent.Provider>
  );
};
