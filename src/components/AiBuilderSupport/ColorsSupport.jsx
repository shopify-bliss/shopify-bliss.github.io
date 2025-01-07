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
