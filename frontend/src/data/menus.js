import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faAppleWhole,
  faComputer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
  {
    label: "Inventario",
  },
  {
    label: "Software",
    path: "/software",
    icon: faAppleWhole,
  },
  {
    label: "Hardware",
    path: "/hardware",
    icon: faComputer,
  },

  {
    label: "Admin",
  },
  {
    label: "Users",
    path: "/form",
    icon: faUser,
  },
  // {
  //   label: "Tabel",
  //   path: "/table",
  //   icon: faTable,
  // },

  // {
  //   label: "Otentikasi",
  // },
  // {
  //   label: "Login",
  //   path: "/auth/login",
  //   icon: faLock,
  // },
  // {
  //   label: "Register",
  //   path: "/auth/register",
  //   icon: faNoteSticky,
  // },
];

export default initMenu;
