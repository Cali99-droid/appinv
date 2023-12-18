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
  nombre: Yup.string().required("Campo obligatorio"),
  descripcion: Yup.string().required("Campo obligatorio"),
  fabricante: Yup.string().required("Campo obligatorio"),
  fechaInstalacion: Yup.date().required("Campo obligatorio"),
  tipoLicencia: Yup.string().required("Campo obligatorio"),
  responsable: Yup.string().required("Campo obligatorio"),
  ubicacion: Yup.string().required("Campo obligatorio"),
  observacion: Yup.string(),
  area_id: Yup.string().required("Campo obligatorio"),
});
function NewSoftware() {
  const [areas, setAreas] = useState([]);
  const { user } = useAuth({ middleware: "auth" });
  const { id } = useParams();

  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      fabricante: "",
      fechaInstalacion: "",
      tipoLicencia: "",
      responsable: "",
      ubicacion: "",
      observacion: "",
      area_id: 1, // Valor por defecto para el select
      user_id: user?.id,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Lógica para manejar la subida del formulario
      console.log(values);
      try {
        setLoading(true);
        if (id) {
          const { data } = await clienteAxios.put(
            `/api/software/${id}`,
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
          const { data } = await clienteAxios.post(`/api/software`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
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
    clienteAxios("/api/areas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setAreas(response.data.data);
    });

    // Si estás en modo de actualización, obtén los datos del servidor y establece los valores iniciales del formulario
    if (id) {
      setLoad(true);
      // Agrega aquí la lógica para obtener los datos del servidor y establecer los valores iniciales de formik.setValues
      // Puedes usar axios, fetch u otra biblioteca para hacer la solicitud HTTP
      // Supongamos que getDataFromServer es una función que obtiene los datos del servidor
      const fetchData = async () => {
        try {
          clienteAxios(`/api/software/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            formik.setValues(response.data.software);
            console.log(response.data.software);
            setLoad(false);
          });
          // const data = await getDataFromServer(id);
          // formik.setValues(data);
        } catch (error) {
          console.error("Error al obtener datos del servidor:", error);
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
                <p>Guardar Artículo Software</p>

                <button
                  onClick={() => navigate("/software")}
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
                  <label htmlFor="nombre" className="text-sm text-gray-600">
                    Nombre
                  </label>
                  <input
                    id="defaultInput"
                    type="text"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.nombre && formik.touched.nombre
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Nombre"
                  />
                  {formik.errors.nombre && formik.touched.nombre && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.nombre}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="descripcion"
                    className="text-sm text-gray-600"
                  >
                    Descripción
                  </label>
                  <input
                    id="descripcion"
                    type="text"
                    name="descripcion"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.descripcion && formik.touched.descripcion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Descripción"
                  />
                  {formik.errors.descripcion && formik.touched.descripcion && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.descripcion}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="fabricante" className="text-sm text-gray-600">
                    Fabricante
                  </label>
                  <input
                    id="fabricante"
                    type="text"
                    name="fabricante"
                    value={formik.values.fabricante}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.fabricante && formik.touched.fabricante
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Fabricante"
                  />
                  {formik.errors.fabricante && formik.touched.fabricante && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.fabricante}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fechaInstalacion"
                    className="text-sm text-gray-600"
                  >
                    Fecha de instalación
                  </label>
                  <input
                    id="fechaInstalacion"
                    type="date"
                    name="fechaInstalacion"
                    value={formik.values.fechaInstalacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.fechaInstalacion &&
                      formik.touched.fechaInstalacion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Fecha de instalación"
                  />
                  {formik.errors.fechaInstalacion &&
                    formik.touched.fechaInstalacion && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.fechaInstalacion}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="tipoLicencia"
                    className="text-sm text-gray-600"
                  >
                    Tipo Licencia
                  </label>
                  <input
                    id="tipoLicencia"
                    type="text"
                    name="tipoLicencia"
                    value={formik.values.tipoLicencia}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.tipoLicencia && formik.touched.tipoLicencia
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Tipo de licencia"
                  />
                  {formik.errors.tipoLicencia &&
                    formik.touched.tipoLicencia && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.tipoLicencia}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="responsable"
                    className="text-sm text-gray-600"
                  >
                    Responsable
                  </label>
                  <input
                    id="responsable"
                    type="text"
                    name="responsable"
                    value={formik.values.responsable}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.responsable && formik.touched.responsable
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Responsable"
                  />
                  {formik.errors.responsable && formik.touched.responsable && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.responsable}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="ubicacion" className="text-sm text-gray-600">
                    Ubicación
                  </label>
                  <input
                    id="ubicacion"
                    type="text"
                    name="ubicacion"
                    value={formik.values.ubicacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.ubicacion && formik.touched.ubicacion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Ubicación"
                  />
                  {formik.errors.ubicacion && formik.touched.ubicacion && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.ubicacion}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="observacion"
                    className="text-sm text-gray-600"
                  >
                    Observación
                  </label>
                  <input
                    id="observacion"
                    type="text"
                    name="observacion"
                    value={formik.values.observacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.observacion && formik.touched.observacion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Observación"
                  />
                  {formik.errors.observacion && formik.touched.observacion && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.observacion}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="area_id" className="text-sm text-gray-600">
                    Área
                  </label>
                  <select
                    id="area_id"
                    name="area_id"
                    value={formik.values.area_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.area_id && formik.touched.area_id
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                  >
                    {areas.map((area, index) => (
                      <option key={index} value={area.id}>
                        {area.nombre}
                      </option>
                    ))}
                    {/* <option value="value1">Value 1</option>
                    <option value="value2">Value 2</option>
                    <option value="value3">Value 3</option> */}
                  </select>
                  {formik.errors.area_id && formik.touched.area_id && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.area_id}
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

export default NewSoftware;
