import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import BrandAiBuilder from "./BrandAiBuilder";
import DevelopmentComponents from "./DevelopmentComponents";
import TimelineAiBuilder from "./TimelineAiBuilder";

function Analytics() {
  const { isLoadingDashboard } = useDashboard();

  return (
    <div className="analystics">
      {isLoadingDashboard && <LoaderPages />}
      <DevelopmentComponents />
      <BrandAiBuilder />
      <TimelineAiBuilder />
    </div>
  );
}

export default Analytics;
