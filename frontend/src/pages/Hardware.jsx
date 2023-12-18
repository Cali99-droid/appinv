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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faHeartCircleBolt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@mui/material";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Hardware() {
  const [sidebarToggle] = useOutletContext();
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  useEffect(() => {
    setLoading(true);
    clienteAxios("/api/hardware", {
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

  const CustomChip = ({ estado }) => {
    switch (estado) {
      case "Inoperativo":
        return <Chip label="Inoperativo" color="error" />;
      case "Regular":
        return <Chip label="Regular" color="info" />;
      case "Malo":
        return <Chip label="Derivado" color="warning" />;
      case "Nuevo":
        return <Chip label="Nuevo" color="success" />;

      default:
        break;
    }
  };
  const renderStatus = ({ row }) => {
    return <CustomChip estado={row.estado} />;
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "codigoPatrimonial",
      headerName: "Código Patrimonial",
      width: 150,
      editable: true,
    },
    {
      field: "serie",
      headerName: "Serie",
      width: 150,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      width: 150,
    },
    {
      field: "marca",
      headerName: "Marca",
      width: 100,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 150,
    },
    {
      field: "fechaAdquisicion",
      headerName: "Fecha de Adquisicion",
      width: 150,
    },
    {
      field: "costoAdquisicion",
      headerName: "Costo de Adquisición",
      width: 100,
    },
    {
      field: "especificaciones",
      headerName: "Especificaciones",

      width: 110,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 110,

      renderCell: renderStatus,
    },
    {
      field: "so",
      headerName: "S O",

      width: 110,
    },
    {
      field: "fechaAsignacion",
      headerName: "Fecha de Asignacion",

      width: 110,
    },
    {
      field: "fechaDevolucion",
      headerName: "Fecha de Devolucion",

      width: 110,
    },
    {
      field: "ubicacion",
      headerName: "Ubicacion",
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
      headerName: "Acciones",
      sortable: false,
      type: "actions",
      width: 110,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={<FontAwesomeIcon icon={faEdit} />}
          label="Editar"
          onClick={() => {
            navigate(`/hardware-actualizar/${params.row.id}`);
          }}
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={<FontAwesomeIcon icon={faHeartCircleBolt} />}
          label="Matenimiento"
          onClick={() => {
            navigate(`/hardware-mantenimiento/${params.row.id}`);
          }}
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={<FontAwesomeIcon icon={faTrash} />}
          label="Eliminar"
          onClick={() => {
            deleteHardware(params.row.id);
          }}
        />,
      ],
    },
  ];
  const deleteHardware = async (id) => {
    try {
      const { data } = await clienteAxios.delete(`/api/hardware/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Eliminado correctamente");
      setDatos(datos.filter((d) => d.id !== id));
    } catch (error) {
      console.log(error.response.data.message);

      toast.error("No se puede eliminar");
      setLoading(false);
    }
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
                Inventario Hardware
              </Typography>
              <Link to={"/hardware-nuevo"}>
                <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                  Nuevo
                </button>
              </Link>
            </div>
            <div className="h-96">
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={datos}
                columns={columns}
                loading={loading}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                  columns: {
                    columnVisibilityModel: {
                      tipo: false,
                      serie: false,
                      descripcion: false,
                      fechaAdquisicion: false,
                      costoAdquisicion: false,
                      especificaciones: false,
                      so: false,
                      fechaAsignacion: false,
                      fechaDevolucion: false,
                      ubicacion: false,
                      observacion: false,
                    },
                  },
                }}
                pageSizeOptions={[5]}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Hardware;
