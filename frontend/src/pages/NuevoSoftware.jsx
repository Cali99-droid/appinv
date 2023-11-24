import React from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFloppyDisk, faPhone } from "@fortawesome/free-solid-svg-icons";

function NewSoftware() {
  const [sidebarToggle] = useOutletContext();
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <div className="mb-2">
              <p>Guardar Artículo Software</p>
              <hr />
            </div>
            <form>
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
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Nombre"
                  />
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
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Descripción"
                  />
                </div>
                <div>
                  <label htmlFor="fabricante" className="text-sm text-gray-600">
                    Fabricante
                  </label>
                  <input
                    id="fabricante"
                    type="text"
                    name="fabricante"
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Fabricante"
                  />
                </div>
                <div>
                  <label htmlFor="fecha" className="text-sm text-gray-600">
                    Fecha de instalación
                  </label>
                  <input
                    id="fecha"
                    type="date"
                    name="fecha"
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Fecha de instalación"
                  />
                </div>
                <div>
                  <label htmlFor="tipo" className="text-sm text-gray-600">
                    Tipo de licencia
                  </label>
                  <input
                    id="tipo"
                    type="text"
                    name="tipo"
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Tipo de licencia"
                  />
                </div>
                <div>
                  <label htmlFor="serial" className="text-sm text-gray-600">
                    Serial
                  </label>
                  <input
                    id="serial"
                    type="text"
                    name="serial"
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Serial"
                  />
                </div>
                <div>
                  <label htmlFor="ubicacion" className="text-sm text-gray-600">
                    Ubicación
                  </label>
                  <input
                    id="ubicacion"
                    type="text"
                    name="ubicacion"
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Ubicación"
                  />
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
                    // onChange={(e) => setEmail(e.target.value)}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Observación"
                  />
                </div>
                <div>
                  <label htmlFor="area" className="text-sm text-gray-600">
                    Área
                  </label>
                  <select
                    name="area"
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                  >
                    <option value="value1">Value 1</option>
                    <option value="value2">Value 2</option>
                    <option value="value3">Value 3</option>
                  </select>
                </div>
                <div className="mt-6 flex flex-row justify-between gap-2">
                  <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg w-full shadow-lg text-sm">
                    Guardar
                  </button>
                  <button className="bg-red-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm w-full ">
                    Cancelar
                  </button>
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
              </div>

              <div className="mt-6 flex flex-row gap-4">
                <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                  Primary Button
                </button>

                <button className="text-emerald-600 border border-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
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
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default NewSoftware;
