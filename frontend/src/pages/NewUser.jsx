import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clienteAxios from "../config/axios";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
function NewUser() {
  const { id } = useParams();
  const token = localStorage.getItem("AUTH_TOKEN");
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    // office:'',
    // status:'',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const [sidebarToggle] = useOutletContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar el formulario

    const newErrors = {};
    if (!userData.name) {
      newErrors.name = "El nombre es requerido";
    }
    if (!userData.email) {
      newErrors.email = "El email es requerido";
    }
    if (!userData.password && userData.id === null) {
      newErrors.password = "La contraseña es requerida";
    }

    // if (userData.status ==! 0 || userData.status ==! 1) {
    //   newErrors.status = 'el estado es requerido';
    // }

    if (Object.keys(newErrors).length === 0) {
      // Realizar acciones cuando el formulario se envíe con éxito
      console.log("Datos del usuario:", userData);
      //   console.log(userData.id);
      try {
        if (userData.id) {
          const resp = await clienteAxios.put(
            `/api/users/${userData.id}`,
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(resp);
          toast.success("Actualizado correctamente");
          // onClose();
          return;
        }
        const resp = await clienteAxios.post("/api/registro", userData);
        console.log(resp);
        toast.success("Creado correctamente");
        console.log("entro");

        navigate("/users");
        // toast.success('Creado correctamente');
        // onClose();
        // console.log(resp)
      } catch (error) {
        // const {email} = error.response.data.errors
        // toast.error(email[0]);
        // console.log(error.response.data.errors)
      }
      setErrors({});

      //   onClose();
    } else {
      setErrors(newErrors);
    }
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Si estás en modo de actualización, obtén los datos del servidor y establece los valores iniciales del formulario
    if (id) {
      setLoading(true);
      // Agrega aquí la lógica para obtener los datos del servidor y establecer los valores iniciales de formik.setValues
      // Puedes usar axios, fetch u otra biblioteca para hacer la solicitud HTTP
      // Supongamos que getDataFromServer es una función que obtiene los datos del servidor
      const fetchData = async () => {
        try {
          clienteAxios(`/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            console.log(response.data.user[0]);
            setLoading(false);
            setUserData(response.data.user[0]);
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

  const navigate = useNavigate();
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
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <ToastContainer />
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <div className="mb-2 ">
              <div className=" flex justify-between">
                <p>Guardar Usuario </p>

                <button
                  onClick={() => navigate(`/users`)}
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
            <form onSubmit={handleSubmit}>
              {/* Form Default */}
              <div>
                <label htmlFor="name" className="text-sm text-gray-600">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={userData.name}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Nombre de usuario"
                />
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Email User"
                />
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              </div>
              <div>
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <div className="text-gray-500 text-xs mt-1">
                  {id ? "Dejar en blanco si no va cambiar" : ""}
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Password User"
                />
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              </div>

              {/* Form Large */}
              {/* <div className="mt-6">
                <label htmlFor="largeInput" className="text-sm text-gray-600">
                  Large Input
                </label>
                <input
                  id="largeInput"
                  type="text"
                  name="largeInput"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-xl placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Large Input"
                />
              </div> */}

              {/* With Icon */}
              {/* <div className="mt-6 relative">
                <label
                  htmlFor="inputWithIcon"
                  className="text-sm text-gray-600"
                >
                  Input with Icon
                </label>

                <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <input
                  id="inputWithIcon"
                  type="text"
                  name="inputWithIcon"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Input With Icon"
                />
              </div> */}

              <div className="mt-6 flex flex-row gap-4">
                <button
                  className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm"
                  type="submit"
                >
                  Guardar
                </button>

                {/* <button className="text-emerald-600 border border-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                  Secondary Button
                </button>

                <button className="text-emerald-600 border border-emerald-300 px-3 py-2 rounded-lg shadow-lg text-sm">
                  Outlined Button
                </button>

                <button className="bg-emerald-600 border-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center">
                  <div>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </div>
                  <span>Primary Icon Button</span>
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default NewUser;
