import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";

function UserRoles() {
  axios.defaults.withCredentials = true;

  const [users, setUsers] = useState({
    total: 0,
    superAdmin: 0,
    admin: 0,
    developer: 0,
    customer: 0,
  });

  const { token, setDashboardLoader, isLoadingDashboard } = useDashboard();

  const fetchUsers = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.allusers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getUser = response.data.data;

      const superAdmin = getUser.filter(
        (user) => user.roles.role_name === "super admin"
      );
      const admin = getUser.filter((user) => user.roles.role_name === "admin");
      const developer = getUser.filter(
        (user) => user.roles.role_name === "developer"
      );
      const customer = getUser.filter(
        (user) => user.roles.role_name === "customer"
      );

      setUsers({
        total: getUser.length,
        superAdmin: superAdmin.length,
        admin: admin.length,
        developer: developer.length,
        customer: customer.length,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const rolesData = useMemo(
    () => ({
      series: [
        {
          data: [
            users.superAdmin,
            users.admin,
            users.developer,
            users.customer,
          ],
        },
      ],
      options: {
        chart: {
          height: 500,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: ["Super Admin", "Admin", "Developer", "Customer"],
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      },
    }),
    [users]
  );

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      <ReactApexChart
        options={rolesData.options}
        series={rolesData.series}
        type="bar"
        width={500}
      />
    </>
  );
}

export default UserRoles;
