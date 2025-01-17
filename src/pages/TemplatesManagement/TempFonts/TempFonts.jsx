import { useState, useEffect } from "react";

function TempFonts() {
  const [fonts, setFonts] = useState("");

  useEffect(() => {
    setFonts("Fonts");
  }, []);

  return (
    <>
      <div>{fonts}</div>
    </>
  );
}

export default TempFonts;
