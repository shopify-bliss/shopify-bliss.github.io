import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";

function BrandAiBuilder() {
  axios.defaults.withCredentials = true;

  const { setDashboardLoader } = useDashboard();

  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        width: 400,
        height: 400,
        type: "donut",
      },
      title: {
        text: "Brands AI Builder",
        margin: 20,
        style: {
          fontSize: "18px",
        },
      },
      labels: [],
      colors: [
        "#0d6efd",
        "#6f42c1",
        "#dc3545",
        "#fd7e14",
        "#ffc107",
        "#198754",
      ],
      dataLabels: {
        style: {
          fontSize: "11px",
        },
      },
      legend: {
        fontSize: "14px",
        itemMargin: {
          vertical: 5,
          horizontal: 15,
        },
        markers: {
          offsetX: -3,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
              total: {
                show: true,
              },
            },
          },
        },
      },
      states: {
        hover: {
          filter: {
            type: "lighten",
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const fetchAiBuilder = useCallback(async () => {
    try {
      setDashboardLoader(true);
      const response = await axios.get(urlEndpoint.aiBuilder);

      const groupedByBrand = response.data.data.reduce((acc, item) => {
        const brand = item.brand.name;

        if (!acc[brand]) acc[brand] = [];

        acc[brand].push(item);
        return acc;
      }, {});

      const brandCounts = Object.entries(groupedByBrand).map(
        ([brand, items]) => ({
          brand,
          count: items.length,
        })
      );

      //   console.log(groupedByBrand);
      //   console.log(brandCounts);

      // Update state untuk chart
      setState((prevState) => ({
        ...prevState,
        series: brandCounts.map((item) => item.count),
        options: {
          ...prevState.options,
          labels: brandCounts.map((item) =>
            item.brand
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
          ),
        },
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [setDashboardLoader]);

  useEffect(() => {
    fetchAiBuilder();
  }, [fetchAiBuilder]);

  return (
    <>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width={400}
        height={400}
      />
    </>
  );
}

export default BrandAiBuilder;
