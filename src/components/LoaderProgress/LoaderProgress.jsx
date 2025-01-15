import React from "react";

export function LoaderProgress({ isAi = false }) {
  return (
    <>
      <div className="loader-progress">
        <div className="loader"></div>
        {isAi ? (
          <span>Ai Builder is working on it...</span>
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
