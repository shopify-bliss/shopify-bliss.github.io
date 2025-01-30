import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";

function DevelopmentComponents() {
  axios.defaults.withCredentials = true;

  const { setDashboardLoader, token, menus, submenus } = useDashboard();

  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        width: 800,
        height: 400,
      },
      colors: ["#198754", "#dc3545"],
      title: {
        text: "Development Components",
        align: "center",
        margin: 20,
        style: {
          fontSize: "18px",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Brand",
          "Sections",
          "Font",
          "Font Designs",
          "Color",
          "Color Designs",
          "Menus",
          "Submenus",
        ],
      },
      fill: {
        opacity: 1,
      },
    },
  });

  const fetchData = useCallback(async () => {
    try {
      setDashboardLoader(true);

      const [
        responseBrand,
        responseSection,
        responseFont,
        responseFontDesign,
        responseColor,
        responseColorDesign,
      ] = await Promise.all([
        axios.get(urlEndpoint.brandsAi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(urlEndpoint.elementsAi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(urlEndpoint.fonts, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(urlEndpoint.fontsAi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(urlEndpoint.colors, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(urlEndpoint.colorsAi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const brandDone = responseBrand.data.data.filter(
        (data) => data.is_develope === false
      ).length;
      const brandDevelopement = responseBrand.data.data.filter(
        (data) => data.is_develope === true
      ).length;
      const sectionDone = responseSection.data.data.filter(
        (data) => data.is_develope === false
      ).length;
      const sectionDevelopement = responseSection.data.data.filter(
        (data) => data.is_develope === true
      ).length;
      const fontDone = responseFont.data.data.filter(
        (data) => data.is_develope === false
      ).length;
      const fontDevelopement = responseFont.data.data.filter(
        (data) => data.is_develope === true
      ).length;
      const fontDesignDone = responseFontDesign.data.data.filter(
        (data) => data.is_develope === false
      ).length;
      const fontDesignDevelopement = responseFontDesign.data.data.filter(
        (data) => data.is_develope === true
      ).length;
      const colorDone = responseColor.data.data.filter(
        (data) => data.is_develope === false
      ).length;
      const colorDevelopement = responseColor.data.data.filter(
        (data) => data.is_develope === true
      ).length;
      const colorDesignDone = responseColorDesign.data.data.filter(
        (data) => data.is_develope === false
      ).length;
      const colorDesignDevelopement = responseColorDesign.data.data.filter(
        (data) => data.is_develope === true
      ).length;
      const menusDone = menus.filter(
        (data) => data.is_develope === false
      ).length;
      const menusDevelopement = menus.filter(
        (data) => data.is_develope === true
      ).length;
      const submenusDone = submenus.filter(
        (data) => data.is_develope === false
      ).length;
      const submenusDevelopement = submenus.filter(
        (data) => data.is_develope === true
      ).length;

      console.log(
        "Done",
        brandDone,
        sectionDone,
        fontDone,
        fontDesignDone,
        colorDone,
        colorDesignDone,
        menusDone,
        submenusDone
      );
      console.log(
        "Developement",
        brandDevelopement,
        sectionDevelopement,
        fontDevelopement,
        fontDesignDevelopement,
        colorDevelopement,
        colorDesignDevelopement,
        menusDevelopement,
        submenusDevelopement
      );

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Done",
            data: [
              brandDone,
              sectionDone,
              fontDone,
              fontDesignDone,
              colorDone,
              colorDesignDone,
              menusDone,
              submenusDone,
            ],
          },
          {
            name: "Is Developement",
            data: [
              brandDevelopement,
              sectionDevelopement,
              fontDevelopement,
              fontDesignDevelopement,
              colorDevelopement,
              colorDesignDevelopement,
              menusDevelopement,
              submenusDevelopement,
            ],
          },
        ],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token, setDashboardLoader, menus, submenus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        width={800}
        height={400}
      />
    </>
  );
}

export default DevelopmentComponents;
