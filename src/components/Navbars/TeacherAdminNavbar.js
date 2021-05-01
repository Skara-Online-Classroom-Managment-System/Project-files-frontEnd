import React from "react";
// import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  const [redirect, setRedirect] = React.useState(false);
  const [details, setDetails] = React.useState({
    className: String,
  });

  function handleSubmit() {
    axios({
      method: "POST",
      data: {
        className: details.className,
      },
      withCredentials: true,
      url: "http://localhost:5000/createClassroom",
    }).then((res) => {
      console.log("hello");
      if (res.status === 200) {
        setRedirect(true);
        window.location.reload();
      }
    });
  }
  if (redirect) {
    window.location.reload();
  }

  function handleChange(event) {
    const value = event.target.value;
    setDetails({
      className: value,
    });
  }
  console.log("inside teacher navbar");
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-#334155 text-sm uppercase hidden lg:inline-block font-semibold"
            href="/admin/dashboard"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
              setDetails({
                className: "",
              });
            }}
            className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
          >
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i
                  className="fa fa-plus-circle"
                  aria-hidden="true"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                    setDetails({
                      className: "",
                    });
                  }}
                ></i>
              </span>
              <input
                type="text"
                placeholder="Enter Name Of Class "
                value={details.className}
                onChange={handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
