import {
  faAppleAlt,
  faBars,
  faBell,
  faHardDrive,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Index({ toggle }) {
  // const avatar =
  //   "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  const avatar =
    "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1702856948~exp=1702857548~hmac=d612ec516242456dae5ee9efcef2b004a06a6b81b7ca05959a9ec40067ad4672";

  return (
    <>
      <header className="">
        <div className="shadow-sm">
          <div className="relative bg-white flex w-full items-center px-5 py-2.5">
            <div className="flex-1">
              <p className="block md:hidden cursor-pointer">
                <FontAwesomeIcon icon={faBars} onClick={toggle} />
              </p>
            </div>
            <div className="">
              <ul className="flex flex-row gap-4 items-center">
                <li>
                  <Link to="/software">
                    <span className="h-9 w-9 cursor-pointer text-gray-600">
                      <FontAwesomeIcon icon={faAppleAlt} />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/hardware">
                    <span className="h-9 w-9 cursor-pointer text-gray-600">
                      <FontAwesomeIcon icon={faHardDrive} />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/users">
                    <span>
                      <img
                        className="rounded-full h-9 w-9 border cursor-pointer"
                        src={avatar}
                        alt="Avatar"
                      />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Index;
