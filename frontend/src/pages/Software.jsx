import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar/Index";
import { Link, useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "articulo",
    headerName: "Artículo",
    width: 150,
    editable: true,
  },
  {
    field: "serie",
    headerName: "N° Serie",
    width: 150,
    editable: true,
  },
  {
    field: "ubicacion",
    headerName: "Ubicación",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, articulo: "PC DELL", serie: "RG5676TH", ubicacion: "Ciencias" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Software() {
  const [sidebarToggle] = useOutletContext();
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

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

            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Software;
