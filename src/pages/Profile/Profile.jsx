import React from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password/Password";
import { useDataToken } from "../../helpers/DataToken";
import { Error401 } from "../Error/Error";

function Profile() {
  const { submenuPage } = useDashboard();
  const { token } = useDataToken();

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
