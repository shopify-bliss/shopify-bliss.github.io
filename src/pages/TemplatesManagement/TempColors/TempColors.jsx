import { useState, useEffect } from "react";

function TempColors() {
  const [colors, setColors] = useState("");

  useEffect(() => {
    setColors("Colors");
  }, []);

  return (
    <>
      <div>{colors}</div>
    </>
  );
}

export default TempColors;
