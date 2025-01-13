import { useState, useEffect, useCallback, useMemo } from "react";

function FontsAiLogics() {
  const [activeFonts, setactiveFonts] = useState(
    "f5731b0d-8017-44a4-b158-f617716a1fb9"
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
