import { useState, useCallback } from "react";

function ColorsAiLogics() {
  const [activeColors, setactiveColors] = useState(
    "ccd9aaf1-0f39-416b-83b4-b2678bf77a72"
  );

  const handleactiveColors = useCallback(
    (color) => {
      setactiveColors(color);
    },
    [setactiveColors]
  );

  return { activeColors, handleactiveColors };
}

export default ColorsAiLogics;
