import React, { useState } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPhone } from "@fortawesome/free-solid-svg-icons";
import clienteAxios from "../config/axios";

function NewUser() {
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
        // if(userData.id){
        //   const resp = await clienteAxios.put(`/api/users/${userData.id}`,userData,{
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //   console.log(resp)
        //   toast.success('Actualizado correctamente');
        //   onClose();
        //   return;
        // }
        const resp = await clienteAxios.post("/api/registro", userData);
        console.log(resp);
        console.log("entro");
        // setErrors({});
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
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
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
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="nombre de usuario"
                />
                <p>{errors.name}</p>
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="Email usuario"
                />
                <p>{errors.email}</p>
              </div>
              <div>
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  placeholder="password user"
                />
                <p>{errors.password}</p>
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
                  Primary Button
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
