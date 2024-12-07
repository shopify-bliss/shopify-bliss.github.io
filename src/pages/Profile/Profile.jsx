import React from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password/Password";
import { useDataToken } from "../../helpers/DataToken";
import { Error401 } from "../Error/Error";
import { useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const { submenuPage, toastMessage } = useDashboard();
  const { token } = useDataToken();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.messageLoginGoogle) {
      toastMessage("success", location.state.messageLoginGoogle);
      navigate(location.pathname, {
        state: { ...location.state, messageLoginGoogle: undefined },
        replace: true,
      });
    }
  }, [location.state, navigate, toastMessage, location.pathname]);

  return (
    <>
      {!token ? (
        <Error401 />
      ) : (
        <LayoutDashboard>
          {submenuPage === "bio" && <div>Profile</div>}
          {submenuPage === "password" && <Password />}
        </LayoutDashboard>
      )}
    </>
  );
}

export default Profile;
