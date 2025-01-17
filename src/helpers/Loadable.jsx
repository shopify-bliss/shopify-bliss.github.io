import { Suspense } from "react";
import { LoaderPages } from "../components/LoaderProgress/LoaderProgress";

const Loadable = (Component) => {
  const LoadableComponent = (props) => {
    return (
      <Suspense fallback={<LoaderPages />}>
        <Component {...props} />
      </Suspense>
    );
  };

  // Tambahkan displayName
  LoadableComponent.displayName = `Loadable(${
    Component.displayName || Component.name || "Unknown"
  })`;

  return LoadableComponent;
};

export default Loadable;
