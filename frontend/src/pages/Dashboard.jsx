import React, { useEffect, useState } from "react";

import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import clienteAxios from "../config/axios.js";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function Dashboard() {
  const { user } = useAuth({ middleware: "auth" });

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  useEffect(() => {
    setLoading(true);
    clienteAxios("/api/dash", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDatos(response.data);
      console.log(response.data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const suma = datos.software + datos.hardware;
  const avatar =
    "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1702856948~exp=1702857548~hmac=d612ec516242456dae5ee9efcef2b004a06a6b81b7ca05959a9ec40067ad4672";

  const dataOS = [
    {
      title: "Inventario Software",
      date: new Date().toLocaleDateString(),

      percentage: datos.software,
      color: "cardInfo",
    },
    {
      title: "Inventario Hardware",
      date: new Date().toLocaleDateString(),

      percentage: datos.hardware,
      color: "cardWarning",
    },
    {
      title: "Total Articulos",
      date: new Date().toLocaleDateString(),

      percentage: suma,
      color: "cardSuccess",
    },
    {
      title: "Total Usuarios",
      date: new Date().toLocaleDateString(),

      percentage: datos.users,
      color: "cardLime",
    },
  ];

  const data = datos?.equipos?.map((e) => {
    return {
      title: e.marca + " " + e.modelo,

      gs: e.codigoPatrimonial,
      percentage: e.mantenimientos_count,
      color: "cardInfo",
    };
  });

  const [sidebarToggle] = useOutletContext();
  if (loading) {
    return (
      <main className="flex  h-full w-full">
        <div className="px-2 mx-auto mainCard">
          <CircularProgress />
        </div>
      </main>
    );
  }
  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader toggle={sidebarToggle} avatar={avatar} user={user} />
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Inventario de Artículos
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto  no-scrollbar">
            {dataOS?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>
        </div>
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Ranking tres equipos con más Mantenimientos
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto  no-scrollbar">
            {data?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>
        </div>

        {/* Laba 
        <div className="px-2 mx-auto mainCard">
              <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
                {/* <StatisticWidget className="col-span-4 col-start-1 bg-white" /> 
                <div className="widgetCard relative hidden md:flex col-span-2 px-6 py-4 text-center flex-col justify-between bg-cyan-700 text-slate-50">
                  <div className="font-semibold text-slate-800 bg-white max-w-fit mx-auto pt-5 pb-2 px-6 absolute -top-3 rounded-lg left-1/2 -translate-x-1/2 whitespace-nowrap">
                    Total inventario
                  </div>
                  <div className="font-semibold m-auto pt-4">
                    <span className="text-lg lg:text-[30px]">{suma}</span>
                    {/* <span className="text-[14px]"> artículos</span> 
                  </div>
                  <p className="text-sm font-semibold">
                    Artículos hardware + software
                  </p>
                  <p className="text-xs">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
         OS Kredit */}
      </main>
    </>
  );
}

export default Dashboard;
