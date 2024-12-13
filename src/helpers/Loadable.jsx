import { Suspense } from "react";

const LoaderPages = () => {
  return (
    <div className="loader-pages">
      <div className="loader-pages-item"></div>
    </div>
  );
};

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoaderPages />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
