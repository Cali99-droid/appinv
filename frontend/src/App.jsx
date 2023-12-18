import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import Blank from "./pages/Blank";
import NotFound from "./pages/NotFound";

import NewSoftware from "./pages/NuevoSoftware";
import Software from "./pages/Software";
import Hardware from "./pages/Hardware";
import NewHardware from "./pages/NuevoHardware";
import NewUser from "./pages/NewUser";

import Mantenimientos from "./pages/Mantenimientos";
import NewMantenimiento from "./pages/NuevoMantenimiento";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/blank" element={<Blank />}></Route>
        <Route path="/software" element={<Software />}></Route>
        <Route path="/hardware" element={<Hardware />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/new-user" element={<NewUser />}></Route>
        <Route path="/update-user/:id" element={<NewUser />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/profile" element={<Blank />}></Route>
        <Route path="/software-nuevo" element={<NewSoftware />}></Route>
        <Route
          path="/software-actualizar/:id"
          element={<NewSoftware />}
        ></Route>

        <Route path="/hardware-nuevo" element={<NewHardware />}></Route>
        <Route
          path="/hardware-actualizar/:id"
          element={<NewHardware />}
        ></Route>
        <Route
          path="/hardware-mantenimiento/:id"
          element={<Mantenimientos />}
        ></Route>
        <Route
          path="/add-mantenimiento/:idEquipo/:id"
          element={<NewMantenimiento />}
        ></Route>
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<NewUser />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
