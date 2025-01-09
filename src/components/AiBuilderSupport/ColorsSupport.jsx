export const OtherColors = ({ activeColors }) => {
  const others =
    activeColors === "75dde78e-34ab-42c1-a5d4-09b2f70d5a49"
      ? "color-other-EAEAEA"
      : activeColors === "a8fec883-6d20-409f-907e-b48eca40e1b3"
      ? "color-other-3A6F77"
      : activeColors === "339216b4-dbe5-42e1-ab5c-4cd612297b94"
      ? "color-other-A7E9AF"
      : activeColors === "2960ea20-7fd6-4c7b-af4d-757a139485a4"
      ? "color-other-A6DCEF"
      : activeColors === "5253b65e-312a-4772-8800-0178fe57c1cd"
      ? "color-other-C9B037"
      : activeColors === "82ad4263-425f-4dbb-8ef0-5b5ca4211840"
      ? "color-other-A97142"
      : activeColors === "c3316b86-021e-47d4-94e2-0602a8594f50"
      ? "color-other-00BCD4"
      : activeColors === "0c28cc75-9de1-42e6-8a6d-9bef160b8fb4"
      ? "color-other-39FF14"
      : activeColors === "f8ba9829-63f6-4586-9830-9b9261f7f77f"
      ? "color-other-014421"
      : activeColors === "a8671510-37b0-4867-8089-6c0d7f5ee6f3"
      ? "color-other-DC143C"
      : activeColors === "bda6c100-be3f-4147-a972-151d49c5ea20"
      ? "color-other-FFD700"
      : activeColors === "269a48d6-c1cb-4854-a210-565a57080cd1"
      ? "color-other-FFA500"
      : "";

  return others;
};

export const BgColors = ({ activeColors }) => {
  const bg =
    activeColors === "75dde78e-34ab-42c1-a5d4-09b2f70d5a49"
      ? "color-bg-FFFFFF"
      : activeColors === "a8fec883-6d20-409f-907e-b48eca40e1b3"
      ? "color-bg-EDEFF2"
      : activeColors === "339216b4-dbe5-42e1-ab5c-4cd612297b94"
      ? "color-bg-FFF8E7"
      : activeColors === "2960ea20-7fd6-4c7b-af4d-757a139485a4"
      ? "color-bg-FFF7CC"
      : activeColors === "5253b65e-312a-4772-8800-0178fe57c1cd"
      ? "color-bg-F7E1D7"
      : activeColors === "82ad4263-425f-4dbb-8ef0-5b5ca4211840"
      ? "color-bg-FFFFF0"
      : activeColors === "c3316b86-021e-47d4-94e2-0602a8594f50"
      ? "color-bg-F9F9F9"
      : activeColors === "0c28cc75-9de1-42e6-8a6d-9bef160b8fb4"
      ? "color-bg-ECEFF1"
      : activeColors === "f8ba9829-63f6-4586-9830-9b9261f7f77f"
      ? "color-bg-F5F5F5"
      : activeColors === "a8671510-37b0-4867-8089-6c0d7f5ee6f3"
      ? "color-bg-F5F5DC"
      : activeColors === "bda6c100-be3f-4147-a972-151d49c5ea20"
      ? "color-bg-F3E8FF"
      : activeColors === "269a48d6-c1cb-4854-a210-565a57080cd1"
      ? "color-bg-E0FFFF"
      : "";

  return bg;
};

export const FontColors = ({ activeColors }) => {
  const font =
    activeColors === "75dde78e-34ab-42c1-a5d4-09b2f70d5a49"
      ? "color-font-000000"
      : activeColors === "a8fec883-6d20-409f-907e-b48eca40e1b3"
      ? "color-font-2A2A72"
      : activeColors === "339216b4-dbe5-42e1-ab5c-4cd612297b94"
      ? "color-font-5A4634"
      : activeColors === "2960ea20-7fd6-4c7b-af4d-757a139485a4"
      ? "color-font-4A4A4A"
      : activeColors === "5253b65e-312a-4772-8800-0178fe57c1cd"
      ? "color-font-0A0A0A"
      : activeColors === "82ad4263-425f-4dbb-8ef0-5b5ca4211840"
      ? "color-font-4B0E16"
      : activeColors === "c3316b86-021e-47d4-94e2-0602a8594f50"
      ? "color-font-3C3C3C"
      : activeColors === "0c28cc75-9de1-42e6-8a6d-9bef160b8fb4"
      ? "color-font-2A2F4F"
      : activeColors === "f8ba9829-63f6-4586-9830-9b9261f7f77f"
      ? "color-font-001F3F"
      : activeColors === "a8671510-37b0-4867-8089-6c0d7f5ee6f3"
      ? "color-font-1C1C1C"
      : activeColors === "bda6c100-be3f-4147-a972-151d49c5ea20"
      ? "color-font-682C91"
      : activeColors === "269a48d6-c1cb-4854-a210-565a57080cd1"
      ? "color-font-D0006F"
      : "";

  return font;
};

export const SpecialColors = ({ activeColors }) => {
  const special =
    activeColors === "75dde78e-34ab-42c1-a5d4-09b2f70d5a49"
      ? "color-special-000000"
      : activeColors === "a8fec883-6d20-409f-907e-b48eca40e1b3"
      ? "color-special-2A2A72"
      : activeColors === "339216b4-dbe5-42e1-ab5c-4cd612297b94"
      ? "color-special-5A4634"
      : activeColors === "2960ea20-7fd6-4c7b-af4d-757a139485a4"
      ? "color-special-4A4A4A"
      : activeColors === "5253b65e-312a-4772-8800-0178fe57c1cd"
      ? "color-special-0A0A0A"
      : activeColors === "82ad4263-425f-4dbb-8ef0-5b5ca4211840"
      ? "color-special-4B0E16"
      : activeColors === "c3316b86-021e-47d4-94e2-0602a8594f50"
      ? "color-special-3C3C3C"
      : activeColors === "0c28cc75-9de1-42e6-8a6d-9bef160b8fb4"
      ? "color-special-2A2F4F"
      : activeColors === "f8ba9829-63f6-4586-9830-9b9261f7f77f"
      ? "color-special-001F3F"
      : activeColors === "a8671510-37b0-4867-8089-6c0d7f5ee6f3"
      ? "color-special-1C1C1C"
      : activeColors === "bda6c100-be3f-4147-a972-151d49c5ea20"
      ? "color-special-682C91"
      : activeColors === "269a48d6-c1cb-4854-a210-565a57080cd1"
      ? "color-special-D0006F"
      : "";

  return special;
};

export const OtherColorsWhite = ({ others, activeSections }) => {
  return (others === "color-other-3A6F77" ||
    others === "color-other-A97142" ||
    others === "color-other-014421") &&
    activeSections.includes("798f1ce0-b732-45a6-838e-f28e137243f7")
    ? { color: "#fff" }
    : {};
};
