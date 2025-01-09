import { useState, useEffect, useCallback, useMemo } from "react";

function FontsAiLogics() {
  const [activeFonts, setactiveFonts] = useState(
    "f9c8e695-17ec-48b0-834f-82b61aeeac1a"
  );

  const handleactiveFonts = useCallback(
    (font) => {
      setactiveFonts(font);
    },
    [setactiveFonts]
  );

  return { activeFonts, handleactiveFonts };
}

export default FontsAiLogics;
