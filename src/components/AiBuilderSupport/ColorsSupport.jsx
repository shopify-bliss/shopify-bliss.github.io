export const OtherColors = ({ activeColors }) => {
  const others =
    activeColors === "ccd9aaf1-0f39-416b-83b4-b2678bf77a72"
      ? "color-other-EAEAEA"
      : activeColors === "78d0f049-6d7a-4c1d-8d1f-1f653fe8da81"
      ? "color-other-3A6F77"
      : activeColors === "b7a44f96-143b-4850-891d-df8c5ce9ec63"
      ? "color-other-A7E9AF"
      : activeColors === "c2b63115-832f-475e-ba52-721ebeb71bde"
      ? "color-other-A6DCEF"
      : activeColors === "93f98379-fcd7-4d53-9353-13a8ffb3db6c"
      ? "color-other-C9B037"
      : activeColors === "1cb35c8b-46b5-4fed-9b97-7ae15d2dd5a9"
      ? "color-other-A97142"
      : activeColors === "546a48e4-0ab8-4b77-af71-c1ee7caba5f5"
      ? "color-other-00BCD4"
      : activeColors === "0f8c2bad-81de-49aa-a8dc-0433c2541d17"
      ? "color-other-39FF14"
      : activeColors === "cbb44430-1129-457b-b0d3-9f6749910970"
      ? "color-other-014421"
      : activeColors === "50d57d4b-4930-49b5-a09d-212d53a5763e"
      ? "color-other-DC143C"
      : activeColors === "becc9468-4b8e-40c1-b31b-fd34a4346a95"
      ? "color-other-FFD700"
      : activeColors === "28796f05-8244-42b3-b743-b7f834544f8f"
      ? "color-other-FFA500"
      : "";

  return others;
};

export const BgColors = ({ activeColors }) => {
  const bg =
    activeColors === "ccd9aaf1-0f39-416b-83b4-b2678bf77a72"
      ? "color-bg-FFFFFF"
      : activeColors === "78d0f049-6d7a-4c1d-8d1f-1f653fe8da81"
      ? "color-bg-EDEFF2"
      : activeColors === "b7a44f96-143b-4850-891d-df8c5ce9ec63"
      ? "color-bg-FFF8E7"
      : activeColors === "c2b63115-832f-475e-ba52-721ebeb71bde"
      ? "color-bg-FFF7CC"
      : activeColors === "93f98379-fcd7-4d53-9353-13a8ffb3db6c"
      ? "color-bg-F7E1D7"
      : activeColors === "1cb35c8b-46b5-4fed-9b97-7ae15d2dd5a9"
      ? "color-bg-FFFFF0"
      : activeColors === "546a48e4-0ab8-4b77-af71-c1ee7caba5f5"
      ? "color-bg-F9F9F9"
      : activeColors === "0f8c2bad-81de-49aa-a8dc-0433c2541d17"
      ? "color-bg-ECEFF1"
      : activeColors === "cbb44430-1129-457b-b0d3-9f6749910970"
      ? "color-bg-F5F5F5"
      : activeColors === "50d57d4b-4930-49b5-a09d-212d53a5763e"
      ? "color-bg-F5F5DC"
      : activeColors === "becc9468-4b8e-40c1-b31b-fd34a4346a95"
      ? "color-bg-F3E8FF"
      : activeColors === "28796f05-8244-42b3-b743-b7f834544f8f"
      ? "color-bg-E0FFFF"
      : "";

  return bg;
};

export const FontColors = ({ activeColors }) => {
  const font =
    activeColors === "ccd9aaf1-0f39-416b-83b4-b2678bf77a72"
      ? "color-font-000000"
      : activeColors === "78d0f049-6d7a-4c1d-8d1f-1f653fe8da81"
      ? "color-font-2A2A72"
      : activeColors === "b7a44f96-143b-4850-891d-df8c5ce9ec63"
      ? "color-font-5A4634"
      : activeColors === "c2b63115-832f-475e-ba52-721ebeb71bde"
      ? "color-font-4A4A4A"
      : activeColors === "93f98379-fcd7-4d53-9353-13a8ffb3db6c"
      ? "color-font-0A0A0A"
      : activeColors === "1cb35c8b-46b5-4fed-9b97-7ae15d2dd5a9"
      ? "color-font-4B0E16"
      : activeColors === "546a48e4-0ab8-4b77-af71-c1ee7caba5f5"
      ? "color-font-3C3C3C"
      : activeColors === "0f8c2bad-81de-49aa-a8dc-0433c2541d17"
      ? "color-font-2A2F4F"
      : activeColors === "cbb44430-1129-457b-b0d3-9f6749910970"
      ? "color-font-001F3F"
      : activeColors === "50d57d4b-4930-49b5-a09d-212d53a5763e"
      ? "color-font-1C1C1C"
      : activeColors === "becc9468-4b8e-40c1-b31b-fd34a4346a95"
      ? "color-font-682C91"
      : activeColors === "28796f05-8244-42b3-b743-b7f834544f8f"
      ? "color-font-D0006F"
      : "";

  return font;
};

export const SpecialColors = ({ activeColors }) => {
  const special =
    activeColors === "ccd9aaf1-0f39-416b-83b4-b2678bf77a72"
      ? "color-special-000000"
      : activeColors === "78d0f049-6d7a-4c1d-8d1f-1f653fe8da81"
      ? "color-special-2A2A72"
      : activeColors === "b7a44f96-143b-4850-891d-df8c5ce9ec63"
      ? "color-special-5A4634"
      : activeColors === "c2b63115-832f-475e-ba52-721ebeb71bde"
      ? "color-special-4A4A4A"
      : activeColors === "93f98379-fcd7-4d53-9353-13a8ffb3db6c"
      ? "color-special-0A0A0A"
      : activeColors === "1cb35c8b-46b5-4fed-9b97-7ae15d2dd5a9"
      ? "color-special-4B0E16"
      : activeColors === "546a48e4-0ab8-4b77-af71-c1ee7caba5f5"
      ? "color-special-3C3C3C"
      : activeColors === "0f8c2bad-81de-49aa-a8dc-0433c2541d17"
      ? "color-special-2A2F4F"
      : activeColors === "cbb44430-1129-457b-b0d3-9f6749910970"
      ? "color-special-001F3F"
      : activeColors === "50d57d4b-4930-49b5-a09d-212d53a5763e"
      ? "color-special-1C1C1C"
      : activeColors === "becc9468-4b8e-40c1-b31b-fd34a4346a95"
      ? "color-special-682C91"
      : activeColors === "28796f05-8244-42b3-b743-b7f834544f8f"
      ? "color-special-D0006F"
      : "";

  return special;
};

export const IntroColorsWhite = ({ others, activeSections }) => {
  return (others === "color-other-3A6F77" ||
    others === "color-other-A97142" ||
    others === "color-other-014421") &&
    activeSections?.includes("798f1ce0-b732-45a6-838e-f28e137243f7")
    ? { color: "#fff" }
    : {};
};
