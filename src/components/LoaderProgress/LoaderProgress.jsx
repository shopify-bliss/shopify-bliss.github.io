import React from "react";

export function LoaderProgress({ isAi = false }) {
  return (
    <>
      <div className="loader-progress">
        <div className="loader"></div>
        {isAi ? (
          <span>Website is being generated, please hold on...</span>
        ) : (
          <span>Setting things up...</span>
        )}
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
