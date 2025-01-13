export const AllFontType1 = ({ brand, group }) => {
  const allType1 =
    brand === "b8068198-68fc-4505-a79e-3a21e626b095" && group === 1
      ? "merriweather"
      : brand === "b8068198-68fc-4505-a79e-3a21e626b095" && group === 2
      ? "libre-baskerville"
      : brand === "6eb77185-a457-467f-a756-a94f53510964" && group === 1
      ? "poppins"
      : brand === "6eb77185-a457-467f-a756-a94f53510964" && group === 2
      ? "quicksand"
      : brand === "b865eb72-0072-4bb3-b8ba-990dfda10e02" && group === 1
      ? "playfair-display"
      : brand === "b865eb72-0072-4bb3-b8ba-990dfda10e02" && group === 2
      ? "cormorant-garamond"
      : brand === "80c6b3ae-9c2d-4ee0-b5a3-7811dab8f08a" && group === 1
      ? "raleway"
      : brand === "80c6b3ae-9c2d-4ee0-b5a3-7811dab8f08a" && group === 2
      ? "exo-2"
      : brand === "fcf1c013-e9a7-4997-a9d7-8fce5be5fcba" && group === 1
      ? "eb-garamond"
      : brand === "fcf1c013-e9a7-4997-a9d7-8fce5be5fcba" && group === 2
      ? "crimson-text"
      : brand === "29a4e401-fa5d-4669-9a89-b8c7d4010b18" && group === 1
      ? "amatic-sc"
      : brand === "29a4e401-fa5d-4669-9a89-b8c7d4010b18" && group === 2
      ? "gloria-hallelujah"
      : "";

  return allType1;
};

export const AllFontType2 = ({ brand, group }) => {
  const allType2 =
    brand === "b8068198-68fc-4505-a79e-3a21e626b095" && group === 1
      ? "roboto"
      : brand === "b8068198-68fc-4505-a79e-3a21e626b095" && group === 2
      ? "work-sans"
      : brand === "6eb77185-a457-467f-a756-a94f53510964" && group === 1
      ? "patrick-hand"
      : brand === "6eb77185-a457-467f-a756-a94f53510964" && group === 2
      ? "caveat"
      : brand === "b865eb72-0072-4bb3-b8ba-990dfda10e02" && group === 1
      ? "lora"
      : brand === "b865eb72-0072-4bb3-b8ba-990dfda10e02" && group === 2
      ? "dm-sans"
      : brand === "80c6b3ae-9c2d-4ee0-b5a3-7811dab8f08a" && group === 1
      ? "montserrat"
      : brand === "80c6b3ae-9c2d-4ee0-b5a3-7811dab8f08a" && group === 2
      ? "bebas-neue"
      : brand === "fcf1c013-e9a7-4997-a9d7-8fce5be5fcba" && group === 1
      ? "open-sans"
      : brand === "fcf1c013-e9a7-4997-a9d7-8fce5be5fcba" && group === 2
      ? "josefin-sans"
      : brand === "29a4e401-fa5d-4669-9a89-b8c7d4010b18" && group === 1
      ? "chewy"
      : brand === "29a4e401-fa5d-4669-9a89-b8c7d4010b18" && group === 2
      ? "fredoka"
      : "";

  return allType2;
};

export const FontType1 = ({ activeFonts }) => {
  const type1 =
    activeFonts === "1cb11fe1-215b-478b-9cf9-e6f3f2cb77f0"
      ? "merriweather"
      : activeFonts === "b4d62042-c2ce-40f3-9639-5214c089dec3"
      ? "libre-baskerville"
      : activeFonts === "d1da437e-5ace-4577-85f0-ce16efc694a0"
      ? "poppins"
      : activeFonts === "924e9cf5-51d9-4596-8a91-de82d9ccdb9b"
      ? "quicksand"
      : activeFonts === "4da41ab9-eed1-4707-a996-015ddc1f09de"
      ? "playfair-display"
      : activeFonts === "ad8da796-45e1-4038-af1e-d5b92b551e52"
      ? "cormorant-garamond"
      : activeFonts === "f5731b0d-8017-44a4-b158-f617716a1fb9"
      ? "raleway"
      : activeFonts === "b066df70-b67b-4262-bef8-faf9a5dbf9db"
      ? "exo-2"
      : activeFonts === "8c2a5a1e-ac5e-4e24-9d12-bf1d7c4b128e"
      ? "eb-garamond"
      : activeFonts === "8ab69d4a-2b73-45a3-9e4e-79cdc9adcd0e"
      ? "crimson-text"
      : activeFonts === "f5ae5c39-0401-4286-96b1-757ca7d74f66"
      ? "amatic-sc"
      : activeFonts === "e48e710f-d3d9-4c9f-ade8-f9134ab0a3d3"
      ? "gloria-hallelujah"
      : "";

  return type1;
};

export const FontType2 = ({ activeFonts }) => {
  const type2 =
    activeFonts === "1cb11fe1-215b-478b-9cf9-e6f3f2cb77f0"
      ? "roboto"
      : activeFonts === "b4d62042-c2ce-40f3-9639-5214c089dec3"
      ? "work-sans"
      : activeFonts === "d1da437e-5ace-4577-85f0-ce16efc694a0"
      ? "patrick-hand"
      : activeFonts === "924e9cf5-51d9-4596-8a91-de82d9ccdb9b"
      ? "caveat"
      : activeFonts === "4da41ab9-eed1-4707-a996-015ddc1f09de"
      ? "lora"
      : activeFonts === "ad8da796-45e1-4038-af1e-d5b92b551e52"
      ? "dm-sans"
      : activeFonts === "f5731b0d-8017-44a4-b158-f617716a1fb9"
      ? "montserrat"
      : activeFonts === "b066df70-b67b-4262-bef8-faf9a5dbf9db"
      ? "bebas-neue"
      : activeFonts === "8c2a5a1e-ac5e-4e24-9d12-bf1d7c4b128e"
      ? "open-sans"
      : activeFonts === "8ab69d4a-2b73-45a3-9e4e-79cdc9adcd0e"
      ? "josefin-sans"
      : activeFonts === "f5ae5c39-0401-4286-96b1-757ca7d74f66"
      ? "chewy"
      : activeFonts === "e48e710f-d3d9-4c9f-ade8-f9134ab0a3d3"
      ? "fredoka"
      : "";

  return type2;
};
