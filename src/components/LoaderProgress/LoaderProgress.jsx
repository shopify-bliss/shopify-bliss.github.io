import React from "react";

export function LoaderProgress() {
  return (
    <>
      <div className="loader-progress">
        <div className="loader"></div>
        <span>Setting things up...</span>
      </div>
    </>
  );
}

export const LoaderPages = () => {
  return (
    <div className="loader-pages">
      <div className="loader-pages-item"></div>
    </div>
  );
};
