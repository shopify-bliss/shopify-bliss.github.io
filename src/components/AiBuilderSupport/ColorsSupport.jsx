export const OtherColors = ({ activeColor }) => {
  const others =
    activeColor === 1
      ? "color-other-EAEAEA"
      : activeColor === 2
      ? "color-other-3A6F77"
      : activeColor === 3
      ? "color-other-A7E9AF"
      : activeColor === 4
      ? "color-other-A6DCEF"
      : activeColor === 5
      ? "color-other-C9B037"
      : activeColor === 6
      ? "color-other-A97142"
      : activeColor === 7
      ? "color-other-00BCD4"
      : activeColor === 8
      ? "color-other-39FF14"
      : activeColor === 9
      ? "color-other-014421"
      : activeColor === 10
      ? "color-other-DC143C"
      : activeColor === 11
      ? "color-other-FFD700"
      : activeColor === 12
      ? "color-other-FFA500"
      : "";

  return others;
};

export const BgColors = ({ activeColor }) => {
  const bg =
    activeColor === 1
      ? "color-bg-FFFFFF"
      : activeColor === 2
      ? "color-bg-EDEFF2"
      : activeColor === 3
      ? "color-bg-FFF8E7"
      : activeColor === 4
      ? "color-bg-FFF7CC"
      : activeColor === 5
      ? "color-bg-F7E1D7"
      : activeColor === 6
      ? "color-bg-FFFFF0"
      : activeColor === 7
      ? "color-bg-F9F9F9"
      : activeColor === 8
      ? "color-bg-ECEFF1"
      : activeColor === 9
      ? "color-bg-F5F5F5"
      : activeColor === 10
      ? "color-bg-F5F5DC"
      : activeColor === 11
      ? "color-bg-F3E8FF"
      : activeColor === 12
      ? "color-bg-E0FFFF"
      : "";

  return bg;
};

export const FontColors = ({ activeColor }) => {
  const font =
    activeColor === 1
      ? "color-font-000000"
      : activeColor === 2
      ? "color-font-2A2A72"
      : activeColor === 3
      ? "color-font-5A4634"
      : activeColor === 4
      ? "color-font-4A4A4A"
      : activeColor === 5
      ? "color-font-0A0A0A"
      : activeColor === 6
      ? "color-font-4B0E16"
      : activeColor === 7
      ? "color-font-3C3C3C"
      : activeColor === 8
      ? "color-font-2A2F4F"
      : activeColor === 9
      ? "color-font-001F3F"
      : activeColor === 10
      ? "color-font-1C1C1C"
      : activeColor === 11
      ? "color-font-682C91"
      : activeColor === 12
      ? "color-font-D0006F"
      : "";

  return font;
};

export const SpecialColors = ({ activeColor }) => {
  const special =
    activeColor === 1
      ? "color-special-000000"
      : activeColor === 2
      ? "color-special-2A2A72"
      : activeColor === 3
      ? "color-special-5A4634"
      : activeColor === 4
      ? "color-special-4A4A4A"
      : activeColor === 5
      ? "color-special-0A0A0A"
      : activeColor === 6
      ? "color-special-4B0E16"
      : activeColor === 7
      ? "color-special-3C3C3C"
      : activeColor === 8
      ? "color-special-2A2F4F"
      : activeColor === 9
      ? "color-special-001F3F"
      : activeColor === 10
      ? "color-special-1C1C1C"
      : activeColor === 11
      ? "color-special-682C91"
      : activeColor === 12
      ? "color-special-D0006F"
      : "";

  return special;
};
