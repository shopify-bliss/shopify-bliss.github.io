export const AllFontType1 = ({ brand, group }) => {
  const allType1 =
    brand === "professional" && group === 1
      ? "merriweather"
      : brand === "professional" && group === 2
      ? "libre-baskerville"
      : brand === "friendly" && group === 1
      ? "poppins"
      : brand === "friendly" && group === 2
      ? "quicksand"
      : brand === "luxury" && group === 1
      ? "playfair-display"
      : brand === "luxury" && group === 2
      ? "cormorant-garamond"
      : brand === "innovative" && group === 1
      ? "montserrat"
      : brand === "innovative" && group === 2
      ? "exo-2"
      : brand === "classic" && group === 1
      ? "eb-garamond"
      : brand === "classic" && group === 2
      ? "crimson-text"
      : brand === "playful" && group === 1
      ? "amatic-sc"
      : brand === "playful" && group === 2
      ? "gloria-hallelujah"
      : "";

  return allType1;
};

export const FontType1 = ({ activeFonts }) => {
  const type1 =
    activeFonts === "6935ba3e-e5af-4eec-887e-05a24367f16b"
      ? "merriweather"
      : activeFonts === "cab69ce3-377a-4f88-9b83-ac36c4213f8c"
      ? "libre-baskerville"
      : activeFonts === "052cf742-79b0-4057-94e3-08126ec32c8c"
      ? "poppins"
      : activeFonts === "a0a57ad8-ea49-43ce-b37f-45a873f591dc"
      ? "quicksand"
      : activeFonts === "854cb94a-34f9-4ebb-b052-e360375a8019"
      ? "playfair-display"
      : activeFonts === "d050d941-499f-4eb7-b8fa-662f5c7f0e9f"
      ? "cormorant-garamond"
      : activeFonts === "f9c8e695-17ec-48b0-834f-82b61aeeac1a"
      ? "montserrat"
      : activeFonts === "c9be8d19-4f6d-4579-9e38-2705e3ba6017"
      ? "exo-2"
      : activeFonts === "58ec129b-3e39-4033-a474-5e279cd5b46d"
      ? "eb-garamond"
      : activeFonts === "6f8967f4-42cc-46ac-9caf-4a59952e5b34"
      ? "crimson-text"
      : activeFonts === "cb27eccc-0072-41f0-b535-ec2ee4bee963"
      ? "amatic-sc"
      : activeFonts === "414dd255-a77f-4f01-a97d-9560d08ab1e8"
      ? "gloria-hallelujah"
      : "";

  return type1;
};

export const AllFontType2 = ({ brand, group }) => {
  const allType2 =
    brand === "professional" && group === 1
      ? "roboto"
      : brand === "professional" && group === 2
      ? "work-sans"
      : brand === "friendly" && group === 1
      ? "patrick-hand"
      : brand === "friendly" && group === 2
      ? "caveat"
      : brand === "luxury" && group === 1
      ? "lora"
      : brand === "luxury" && group === 2
      ? "dm-sans"
      : brand === "innovative" && group === 1
      ? "raleway"
      : brand === "innovative" && group === 2
      ? "bebas-neue"
      : brand === "classic" && group === 1
      ? "open-sans"
      : brand === "classic" && group === 2
      ? "josefin-sans"
      : brand === "playful" && group === 1
      ? "chewy"
      : brand === "playful" && group === 2
      ? "fredoka"
      : "";

  return allType2;
};

export const FontType2 = ({ activeFonts }) => {
  const type2 =
    activeFonts === "6935ba3e-e5af-4eec-887e-05a24367f16b"
      ? "roboto"
      : activeFonts === "cab69ce3-377a-4f88-9b83-ac36c4213f8c"
      ? "work-sans"
      : activeFonts === "052cf742-79b0-4057-94e3-08126ec32c8c"
      ? "patrick-hand"
      : activeFonts === "a0a57ad8-ea49-43ce-b37f-45a873f591dc"
      ? "caveat"
      : activeFonts === "854cb94a-34f9-4ebb-b052-e360375a8019"
      ? "lora"
      : activeFonts === "d050d941-499f-4eb7-b8fa-662f5c7f0e9f"
      ? "dm-sans"
      : activeFonts === "f9c8e695-17ec-48b0-834f-82b61aeeac1a"
      ? "raleway"
      : activeFonts === "c9be8d19-4f6d-4579-9e38-2705e3ba6017"
      ? "bebas-neue"
      : activeFonts === "58ec129b-3e39-4033-a474-5e279cd5b46d"
      ? "open-sans"
      : activeFonts === "6f8967f4-42cc-46ac-9caf-4a59952e5b34"
      ? "josefin-sans"
      : activeFonts === "cb27eccc-0072-41f0-b535-ec2ee4bee963"
      ? "chewy"
      : activeFonts === "414dd255-a77f-4f01-a97d-9560d08ab1e8"
      ? "fredoka"
      : "";

  return type2;
};
