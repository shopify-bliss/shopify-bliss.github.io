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

export const AllFonts = ({ fontId }) => {
  const fontFamily =
    fontId === "c7c5f0f2-e829-46b2-963e-e42158e4a36d"
      ? "merriweather"
      : fontId === "71377880-c0e8-4da9-87e2-9d58a2b4097e"
      ? "libre-baskerville"
      : fontId === "bd2da241-45e9-4f79-bc94-3239180665e0"
      ? "poppins"
      : fontId === "422389f6-6998-4635-ab52-6ef9afda52a8"
      ? "quicksand"
      : fontId === "820987ee-a4dc-43b0-8f79-03830e1be866"
      ? "playfair-display"
      : fontId === "85883042-6eea-4cb9-9bff-e324901b9bbb"
      ? "cormorant-garamond"
      : fontId === "bb640f97-e54e-4799-8579-c400872d09bd"
      ? "raleway"
      : fontId === "0107e1ef-e412-40cc-8f7a-d92f48aedaf3"
      ? "exo-2"
      : fontId === "a60d0b12-d5df-416f-81e2-65ed6edc462f"
      ? "eb-garamond"
      : fontId === "e5b5e95f-26bc-4e00-bebc-2757b3d6bc31"
      ? "crimson-text"
      : fontId === "30d9ec00-d0a4-4046-acd9-aa31d3065696"
      ? "amatic-sc"
      : fontId === "80decc82-f7a2-4efd-b702-f8e071a6dc1b"
      ? "gloria-hallelujah"
      : fontId === "6935ba3e-e5af-4eec-887e-05a24367f16b"
      ? "roboto"
      : fontId === "cab69ce3-377a-4f88-9b83-ac36c4213f8c"
      ? "work-sans"
      : fontId === "052cf742-79b0-4057-94e3-08126ec32c8c"
      ? "patrick-hand"
      : fontId === "a0a57ad8-ea49-43ce-b37f-45a873f591dc"
      ? "caveat"
      : fontId === "854cb94a-34f9-4ebb-b052-e360375a8019"
      ? "lora"
      : fontId === "d050d941-499f-4eb7-b8fa-662f5c7f0e9f"
      ? "dm-sans"
      : fontId === "f9c8e695-17ec-48b0-834f-82b61aeeac1a"
      ? "montserrat"
      : fontId === "c9be8d19-4f6d-4579-9e38-2705e3ba6017"
      ? "bebas-neue"
      : fontId === "58ec129b-3e39-4033-a474-5e279cd5b46d"
      ? "open-sans"
      : fontId === "6f8967f4-42cc-46ac-9caf-4a59952e5b34"
      ? "josefin-sans"
      : fontId === "cb27eccc-0072-41f0-b535-ec2ee4bee963"
      ? "chewy"
      : fontId === "414dd255-a77f-4f01-a97d-9560d08ab1e8"
      ? "fredoka"
      : "";

  return fontFamily;
};
