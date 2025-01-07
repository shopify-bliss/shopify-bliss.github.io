export const AllFontType1 = ({ brand, group }) => {
  const allType1 =
    brand === "professional" && group === 1
      ? "merriweather"
      : brand === "professional" && group === 2
      ? "work-sans"
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

export const FontType1 = ({ activeFont }) => {
  const type1 =
    activeFont === 1
      ? "merriweather"
      : activeFont === 2
      ? "libre-baskerville"
      : activeFont === 3
      ? "poppins"
      : activeFont === 4
      ? "quicksand"
      : activeFont === 5
      ? "playfair-display"
      : activeFont === 6
      ? "cormorant-garamond"
      : activeFont === 7
      ? "montserrat"
      : activeFont === 8
      ? "exo-2"
      : activeFont === 9
      ? "eb-garamond"
      : activeFont === 10
      ? "crimson-text"
      : activeFont === 11
      ? "amatic-sc"
      : activeFont === 12
      ? "gloria-hallelujah"
      : "";

  return type1;
};

export const AllFontType2 = ({ brand, group }) => {
  const allType2 =
    brand === "professional" && group === 1
      ? "roboto"
      : brand === "professional" && group === 2
      ? "libre-baskerville"
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

export const FontType2 = ({ activeFont }) => {
  const type2 =
    activeFont === 1
      ? "roboto"
      : activeFont === 2
      ? "work-sans"
      : activeFont === 3
      ? "patrick-hand"
      : activeFont === 4
      ? "caveat"
      : activeFont === 5
      ? "lora"
      : activeFont === 6
      ? "dm-sans"
      : activeFont === 7
      ? "raleway"
      : activeFont === 8
      ? "bebas-neue"
      : activeFont === 9
      ? "open-sans"
      : activeFont === 10
      ? "josefin-sans"
      : activeFont === 11
      ? "chewy"
      : activeFont === 12
      ? "fredoka"
      : "";

  return type2;
};
