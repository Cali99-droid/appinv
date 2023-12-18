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
  codigoPatrimonial: Yup.string().required("Campo obligatorio"),
  serie: Yup.string().required("Campo obligatorio"),
  tipo: Yup.string().required("Campo obligatorio"),
  marca: Yup.string().required("Campo obligatorio"),
  modelo: Yup.string().required("Campo obligatorio"),
  descripcion: Yup.string().required("Campo obligatorio"),
  fechaAdquisicion: Yup.date().required("Campo obligatorio"),
  costoAdquisicion: Yup.string().required("Campo obligatorio"),
  especificaciones: Yup.string().required("Campo obligatorio"),
  estado: Yup.string().required("Campo obligatorio"),
  so: Yup.string().required("Campo obligatorio"),
  fechaAsignacion: Yup.date().required("Campo obligatorio"),
  fechaDevolucion: Yup.date().required("Campo obligatorio"),
  responsable: Yup.string().required("Campo obligatorio"),
  ubicacion: Yup.string().required("Campo obligatorio"),
  observacion: Yup.string(),
  area_id: Yup.string().required("Campo obligatorio"),
});
function NewHardware() {
  const [areas, setAreas] = useState([]);
  const { user } = useAuth({ middleware: "auth" });
  const { id } = useParams();

  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");
  const formik = useFormik({
    initialValues: {
      codigoPatrimonial: "",
      serie: "",
      tipo: "",
      marca: "",
      modelo: "",
      descripcion: "",
      fechaAdquisicion: "",
      costoAdquisicion: "",
      especificaciones: "",
      estado: "Inoperativo",
      so: "",
      fechaAsignacion: "",
      fechaDevolucion: "",
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
            `/api/hardware/${id}`,
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
          const { data } = await clienteAxios.post(`/api/hardware`, values, {
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
        toast.error(error.response.data.message);
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
          clienteAxios(`/api/hardware/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            formik.setValues(response.data.hardware);
            console.log(response.data.hardware);
            setLoad(false);
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
                <p>Guardar Artículo Hardware</p>

                <button
                  onClick={() => navigate("/hardware")}
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
                  <label
                    htmlFor="codigoPatrimonial"
                    className="text-sm text-gray-600"
                  >
                    Codigo Patrimonial
                  </label>
                  <input
                    id="defaultInput"
                    type="text"
                    name="codigoPatrimonial"
                    value={formik.values.codigoPatrimonial}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.codigoPatrimonial &&
                      formik.touched.codigoPatrimonial
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Código"
                  />
                  {formik.errors.codigoPatrimonial &&
                    formik.touched.codigoPatrimonial && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.codigoPatrimonial}
                      </div>
                    )}
                </div>
                <div>
                  <label htmlFor="serie" className="text-sm text-gray-600">
                    Serie
                  </label>
                  <input
                    id="defaultInput"
                    type="text"
                    name="serie"
                    value={formik.values.serie}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.serie && formik.touched.serie
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Serie"
                  />
                  {formik.errors.serie && formik.touched.serie && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.serie}
                    </div>
                  )}
                </div>
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
                  <label htmlFor="marca" className="text-sm text-gray-600">
                    Marca
                  </label>
                  <input
                    id="defaultInput"
                    type="text"
                    name="marca"
                    value={formik.values.marca}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.marca && formik.touched.marca
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Marca"
                  />
                  {formik.errors.marca && formik.touched.marca && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.marca}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="modelo" className="text-sm text-gray-600">
                    modelo
                  </label>
                  <input
                    id="defaultInput"
                    type="text"
                    name="modelo"
                    value={formik.values.modelo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.modelo && formik.touched.modelo
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Modelo"
                  />
                  {formik.errors.modelo && formik.touched.modelo && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.modelo}
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
                  <label
                    htmlFor="fechaAdquisicion"
                    className="text-sm text-gray-600"
                  >
                    Fecha de Adquisición
                  </label>
                  <input
                    id="fechaAdquisicion"
                    type="date"
                    name="fechaAdquisicion"
                    value={formik.values.fechaAdquisicion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.fechaAdquisicion &&
                      formik.touched.fechaAdquisicion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Fecha de instalación"
                  />
                  {formik.errors.fechaAdquisicion &&
                    formik.touched.fechaAdquisicion && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.fechaAdquisicion}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="costoAdquisicion"
                    className="text-sm text-gray-600"
                  >
                    Costo de Adquisición
                  </label>
                  <input
                    id="costoAdquisicion"
                    type="number"
                    name="costoAdquisicion"
                    value={formik.values.costoAdquisicion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.costoAdquisicion &&
                      formik.touched.costoAdquisicion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder=" Costo de Adquisición"
                  />
                  {formik.errors.costoAdquisicion &&
                    formik.touched.costoAdquisicion && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.costoAdquisicion}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="especificaciones"
                    className="text-sm text-gray-600"
                  >
                    Especificaciones Técnicas
                  </label>
                  <input
                    id="especificaciones"
                    type="text"
                    name="especificaciones"
                    value={formik.values.especificaciones}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.especificaciones &&
                      formik.touched.especificaciones
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder=" Especificaciones Técnicas"
                  />
                  {formik.errors.especificaciones &&
                    formik.touched.especificaciones && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.especificaciones}
                      </div>
                    )}
                </div>
                <div>
                  <label htmlFor="so" className="text-sm text-gray-600">
                    Sistema operativo
                  </label>
                  <input
                    id="so"
                    type="text"
                    name="so"
                    value={formik.values.so}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.so && formik.touched.so
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="so"
                  />
                  {formik.errors.so && formik.touched.so && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.so}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fechaDevolucion"
                    className="text-sm text-gray-600"
                  >
                    Fecha de Devolución
                  </label>
                  <input
                    id="fechaDevolucion"
                    type="date"
                    name="fechaDevolucion"
                    value={formik.values.fechaDevolucion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.fechaDevolucion &&
                      formik.touched.fechaDevolucion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Fecha de instalación"
                  />
                  {formik.errors.fechaDevolucion &&
                    formik.touched.fechaDevolucion && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.fechaDevolucion}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="fechaAsignacion"
                    className="text-sm text-gray-600"
                  >
                    Fecha de Asignación
                  </label>
                  <input
                    id="fechaAsignacion"
                    type="date"
                    name="fechaAsignacion"
                    value={formik.values.fechaAsignacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.fechaAsignacion &&
                      formik.touched.fechaAsignacion
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                    placeholder="Fecha de instalación"
                  />
                  {formik.errors.fechaAsignacion &&
                    formik.touched.fechaAsignacion && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.fechaAsignacion}
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
                  <label htmlFor="estado" className="text-sm text-gray-600">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formik.values.estado}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`text-sm placeholder-gray-500 px-4 rounded-lg border ${
                      formik.errors.estado && formik.touched.estado
                        ? "border-red-500"
                        : "border-gray-200"
                    } w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1`}
                  >
                    <option value="Inoperativo">Inoperativo</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                    <option value="Nuevo">Nuevo</option>
                  </select>
                  {formik.errors.estado && formik.touched.estado && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.estado}
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

export default NewHardware;
