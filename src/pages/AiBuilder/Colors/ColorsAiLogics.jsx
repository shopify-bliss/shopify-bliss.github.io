import { useState, useEffect, useCallback, useMemo } from "react";

function ColorsAiLogics() {
  const [activeColors, setactiveColors] = useState(
    "75dde78e-34ab-42c1-a5d4-09b2f70d5a49"
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
