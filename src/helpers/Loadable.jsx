import { Suspense } from "react";
import { LoaderPages } from "../components/LoaderProgress/LoaderProgress";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoaderPages />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
