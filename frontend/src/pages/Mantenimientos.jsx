import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  esES,
} from "@mui/x-data-grid";
import Navbar from "../components/Navbar/Index";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import clienteAxios from "../config/axios";

import { useAuth } from "../hooks/useAuth";
import {
  faAdd,
  faArrowAltCircleLeft,
  faEdit,
  faNewspaper,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
function Mantenimientos() {
  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext();
  const { user } = useAuth({ middleware: "auth" });
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  useEffect(() => {
    setLoading(true);
    clienteAxios("/api/mantenimiento", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDatos(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
      editable: true,
    },
    {
      field: "tecnico",
      headerName: "Tecnico",
      width: 150,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
    },

    {
      field: "actions",
      headerName: "Editar",
      sortable: false,
      type: "actions",
      width: 110,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={<FontAwesomeIcon icon={faEdit} />}
          label="Editar"
          onClick={() => {
            navigate(`/add-mantenimiento/${id}/${params.row.id}`);
          }}
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={<FontAwesomeIcon icon={faTrash} />}
          label="Eliminar"
          onClick={() => {
            deleteMant(params.row.id);
          }}
        />,
      ],
    },
  ];

  const deleteMant = async (id) => {
    setDatos(datos.filter((d) => d.id !== id));
    const { data } = await clienteAxios.delete(`/api/mantenimiento/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Eliminado correctamente");
  };

  const [equipo, setEquipo] = useState({});
  useEffect(() => {
    // Si estás en modo de actualización, obtén los datos del servidor y establece los valores iniciales del formulario
    if (id) {
      // Agrega aquí la lógica para obtener los datos del servidor y establecer los valores iniciales de formik.setValues
      // Puedes usar axios, fetch u otra biblioteca para hacer la solicitud HTTP
      // Supongamos que getDataFromServer es una función que obtiene los datos del servidor
      const fetchData = async () => {
        try {
          clienteAxios(`/api/hardware/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            setEquipo(response.data.hardware);
            console.log(response.data.hardware);
          });
          // const data = await getDataFromServer(id);
          // formik.setValues(data);
        } catch (error) {
          console.error("Error al obtener datos del servidor:", error);
        }
      };

      fetchData();
    }
  }, [id]);
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />
        <ToastContainer />
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <div className="flex justify-between pb-2">
              {equipo.marca !== undefined ? (
                <Typography fontWeight={"bold"} variant={"h6"}>
                  Lista de Mantenimientos del equipo:
                  {equipo.marca + "-" + equipo.modelo}
                </Typography>
              ) : (
                <Box sx={{ width: "80%" }}>
                  <LinearProgress />
                </Box>
              )}

              <div className="flex justify-between gap-2">
                <button
                  onClick={() => navigate(`/hardware`)}
                  className="bg-orange-400 border-orange-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center"
                >
                  <div>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                  </div>
                  <span>Volver</span>
                </button>
                <Link to={`/add-mantenimiento/${id}/new`}>
                  <button className="bg-emerald-600 border-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center">
                    <div>
                      <FontAwesomeIcon icon={faAdd} />
                    </div>
                    <span>Nuevo</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="h-96">
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                rows={datos}
                columns={columns}
                loading={loading}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Mantenimientos;
