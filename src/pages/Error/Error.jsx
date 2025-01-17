import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ErrorParent({ typeMain }) {
  const visualRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (visualRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = 45 / (width / height);
        visualRef.current.style.transform = `translate(-50%, -50%) rotate(-${ratio}deg)`;
      }
    };

    // Tambahkan event listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    // Panggil fungsi sekali untuk inisialisasi
    handleResize();

    // Cleanup saat komponen unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  return (
    <div className="error-page">
      <Link to={`${typeMain === "404" ? "/" : "/login"}`}>
        <svg
          height="0.8em"
          width="0.8em"
          viewBox="0 0 2 1"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#777777"
            strokeWidth="0.1"
            points="0.9,0.1 0.1,0.5 0.9,0.9"
          />
        </svg>{" "}
        {typeMain === "404" ? "Back to Home" : "Back to Login"}
      </Link>
      <div className="background-wrapper">
        <h1 id="visual" ref={visualRef}>
          {typeMain === "404"
            ? 404
            : typeMain === "403"
            ? 403
            : typeMain === "401"
            ? 401
            : "An error has occurred."}
        </h1>
      </div>
      <p>
        {typeMain === "404"
          ? "Oops! The page you are looking for doesn't exist."
          : typeMain === "403"
          ? "You're not allowed to access this page."
          : typeMain === "401"
          ? "Access Denied. You don't have permission to view this page."
          : "An error has occurred."}
      </p>
    </div>
  );
}

ErrorParent.propTypes = {
  typeMain: PropTypes.string,
};

export default ErrorParent;

export function Error404() {
  return <ErrorParent typeMain={"404"} />;
}

export function Error403() {
  return <ErrorParent typeMain={"403"} />;
}

export function Error401() {
  return <ErrorParent typeMain={"401"} />;
}
