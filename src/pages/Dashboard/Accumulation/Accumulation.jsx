import dashboardAccumulation from "../../../data/dashboardAccumulation.json";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";

function Accumulation() {
  const { user } = useDashboard();

  return (
    <div className="accumulation-dashboard">
      {dashboardAccumulation.map((acc) => {
        const hasAccess = acc.access.includes(user?.roles?.role_name);

        return (
          <>
            {hasAccess && (
              <div className="accumulation" key={acc.dashboard_config_id}>
                <div className="accumulation-header">
                  <span className="material-symbols-rounded">{acc.icon}</span>
                  <div className="text">{acc.name}</div>
                </div>
                <div className="accumulation-total">{acc.total}</div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Accumulation;
