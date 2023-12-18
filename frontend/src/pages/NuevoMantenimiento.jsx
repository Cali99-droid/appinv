import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Index";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import clienteAxios from "../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFloppyDisk, faPhone } from "@fortawesome/free-solid-svg-icons";
const validationSchema = Yup.object().shape({
  tipo: Yup.string().required("Campo obligatorio"),
  tecnico: Yup.string().required("Campo obligatorio"),
  fecha: Yup.string().required("Campo obligatorio"),
  hardware_id: Yup.string().required("Campo obligatorio"),
});
function NewMantenimiento() {
  const { user } = useAuth({ middleware: "auth" });
  const { id, idEquipo } = useParams();

  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  const formik = useFormik({
    initialValues: {
      tipo: "",
      tecnico: "",
      fecha: "",
      hardware_id: idEquipo,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Lógica para manejar la subida del formulario
      console.log(values);
      try {
        setLoading(true);
        if (!isNaN(id)) {
          const { data } = await clienteAxios.put(
            `/api/mantenimiento/${id}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          toast.success("Actualizado correctamente");
        } else {
          const { data } = await clienteAxios.post(
            `/api/mantenimiento`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(data);
          toast.success("Guardado correctamente");
          formik.handleReset();
        }

        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    },
  });
  const [load, setLoad] = useState(false);
  useEffect(() => {
    // Si estás en modo de actualización, obtén los datos del servidor y establece los valores iniciales del formulario
    if (!isNaN(id)) {
      setLoad(true);
      // Agrega aquí la lógica para obtener los datos del servidor y establecer los valores iniciales de formik.setValues
      // Puedes usar axios, fetch u otra biblioteca para hacer la solicitud HTTP
      // Supongamos que getDataFromServer es una función que obtiene los datos del servidor
      const fetchData = async () => {
        try {
          clienteAxios(`/api/mantenimiento/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            formik.setValues(response.data.mantenimiento);
            console.log(response.data.mantenimiento);
          });
          setLoad(false);
          // const data = await getDataFromServer(id);
          // formik.setValues(data);
        } catch (error) {
          console.error("Error al obtener datos del servidor:", error);
          toast.error("Error al obtener datos del servidor:" + error);
          setLoad(false);
        }
      };

      fetchData();
    }
  }, [id]);
  if (load) {
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
        <ToastContainer />
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <div className="mb-2 ">
              <div className=" flex justify-between">
                <p>Guardar Mantenimiento </p>

                <button
                  onClick={() =>
                    navigate(`/hardware-mantenimiento/${idEquipo}`)
                  }
                  className="bg-orange-400 border-orange-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center"
                >
                  <div>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                  </div>
                  <span>Volver</span>
                </button>
              </div>{" "}
              <hr />
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* Form Default */}
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="tipo" className="text-sm text-gray-600">
                    Tipo
                  </label>
                  <input
                    id="defaultInput"
                    type="text"
                    name="tipo"
                    value={formik.values.tipo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.tipo && formik.touched.tipo
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Tipo"
                  />
                  {formik.errors.tipo && formik.touched.tipo && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.tipo}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="tecnico" className="text-sm text-gray-600">
                    Tècnico
                  </label>
                  <input
                    id="tecnico"
                    type="text"
                    name="tecnico"
                    value={formik.values.tecnico}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.tecnico && formik.touched.tecnico
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Descripción"
                  />
                  {formik.errors.tecnico && formik.touched.tecnico && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.tecnico}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="fecha" className="text-sm text-gray-600">
                    Fecha
                  </label>
                  <input
                    id="fecha"
                    type="date"
                    name="fecha"
                    value={formik.values.fecha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.fecha && formik.touched.fecha
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Fecha de instalación"
                  />
                  {formik.errors.fecha && formik.touched.fecha && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.fecha}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-row justify-between gap-2">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg w-full shadow-lg text-sm"
                    disabled={loading}
                  >
                    <span className="mr-2 md:uppercase">
                      {loading ? "Guardando...." : "Guardar"}
                    </span>
                  </button>
                  <button
                    onClick={formik.handleReset}
                    className="bg-red-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm w-full "
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default NewMantenimiento;
