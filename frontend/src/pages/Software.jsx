import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  esES,
} from "@mui/x-data-grid";
import Navbar from "../components/Navbar/Index";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import { useAuth } from "../hooks/useAuth";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Software() {
  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext();
  const { user } = useAuth({ middleware: "auth" });
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  useEffect(() => {
    setLoading(true);
    clienteAxios("/api/software", {
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
      field: "nombre",
      headerName: "Artículo",
      width: 150,
      editable: true,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 150,
    },
    {
      field: "fabricante",
      headerName: "Fabricante",
      width: 150,
    },
    {
      field: "fechaInstalacion",
      headerName: "Fecha de instalación",
      width: 150,
    },
    {
      field: "tipoLicencia",
      headerName: "Tipo de lincencia",
      width: 150,
    },
    {
      field: "ubicacion",
      headerName: "Ubicación",

      width: 110,
    },
    {
      field: "observacion",
      headerName: "Observacion",
      width: 110,
    },
    {
      field: "responsable",
      headerName: "Responsable",
      width: 110,
    },
    {
      field: "area",
      headerName: "Area",
      width: 110,
      valueGetter: (params) => params.row.area?.nombre,
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
            navigate(`/software-actualizar/${params.row.id}`);
          }}
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={<FontAwesomeIcon icon={faTrash} />}
          label="Eliminar"
          onClick={() => {
            deleteSoftware(params.row.id);
          }}
        />,
      ],
    },
  ];

  const deleteSoftware = async (id) => {
    setDatos(datos.filter((d) => d.id !== id));
    const { data } = await clienteAxios.delete(`/api/software/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Eliminado correctamente");
  };
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />
        <ToastContainer />
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <div className="flex justify-between pb-2">
              <Typography fontWeight={"bold"} variant={"h6"}>
                Inventario Software
              </Typography>
              <Link to={"/software-nuevo"}>
                <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                  Nuevo
                </button>
              </Link>
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
                loading={datos.length <= 0}
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

export default Software;
