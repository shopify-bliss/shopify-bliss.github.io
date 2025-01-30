import { useState, useEffect, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";

function TimelineAiBuilder() {
  axios.defaults.withCredentials = true;

  const [state, setState] = useState({
    series: [
      {
        name: "Total Data",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        width: 700,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: "Timeline AI Builder",
        align: "center",
        style: {
          fontSize: "18px",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: (val) => {
            return `${val} Web`;
          },
        },
      },
    },
  });

  const { setDashboardLoader } = useDashboard();

  const groupDataByWeeks = (data) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based (Januari = 0)
    const weeks = getWeeksInMonth(year, month);

    console.log("Weeks Data:", weeks);

    // Inisialisasi array untuk menghitung jumlah data per minggu
    const dataPerWeek = Array(weeks.length).fill(0);

    // Loop melalui data dan kelompokkan berdasarkan minggu
    data.forEach((item) => {
      const createdAt = new Date(item.created_at);

      weeks.forEach((week, index) => {
        if (createdAt >= week.start && createdAt <= week.end) {
          dataPerWeek[index]++;
        }
      });
    });

    // Mengembalikan data jumlah per minggu
    return {
      categories: weeks.map(
        (week) =>
          `${week.start.getDate()} - ${week.end.getDate()} ${week.end.toLocaleString(
            "default",
            { month: "short" }
          )}`
      ),

      data: dataPerWeek,
    };
  };

  const getWeeksInMonth = (year, month) => {
    const weeks = [];
    let start = new Date(year, month, 1); // Tanggal 1 bulan ini
    const end = new Date(year, month + 1, 0); // Hari terakhir bulan ini

    while (start <= end) {
      const weekStart = new Date(start);
      const weekEnd = new Date(
        Math.min(start.getTime() + 6 * 24 * 60 * 60 * 1000, end.getTime())
      );
      weeks.push({ start: weekStart, end: weekEnd });
      start = new Date(weekEnd.getTime() + 1 * 24 * 60 * 60 * 1000); // Hari berikutnya
    }

    return weeks;
  };

  const fetchAiBuilder = useCallback(async () => {
    try {
      setDashboardLoader(true);

      const response = await axios.get(urlEndpoint.aiBuilder);
      const logs = response.data.data; // Asumsikan `data` adalah array log

      // Mengelompokkan data berdasarkan minggu
      const groupedData = groupDataByWeeks(logs);

      console.log("groupedData", groupedData);

      // Memperbarui state dengan data yang dikelompokkan
      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Total Data",
            data: groupedData.data,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            categories: groupedData.categories,
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
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
        type="area"
        width={700}
        height={350}
      />
    </>
  );
}

export default TimelineAiBuilder;
