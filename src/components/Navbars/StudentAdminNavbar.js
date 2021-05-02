import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  const [classCodeEntered, setClassCodeEntered] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [msg,setMsg]=React.useState("")

  function handleAddClass() {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/addclass",
      data: {
        classCode: classCodeEntered,
      },
    }).then((res) => {
      const loadedData = res.data;
      console.log(loadedData, "addclass");
      if (res.status === 200) {
        setRedirect(true);
        setShow(true);
        setMsg(res.data.result);
      }
    });
  }
  if (redirect && msg === "Success") {
    window.location.reload();
  }
  function closeAlert(){
    setShow(false);
  }
  function showAlert() {
    console.log(show,"show")
    console.log(msg);
    if (show) {
     return( <div class="bg-teal-200 border border-red-400 text-red-700 px-4 py-3 z-50 rounded relative" role="alert">
      <strong class="font-bold">{msg}</strong>
      <span class="block sm:inline">Please enter correct code</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      <i role="button" onClick={closeAlert} className="fas fa-times"></i>
        {/* <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg> */}
      </span>
    </div>)
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    setClassCodeEntered(value);
  }
  return (
    <>
      {showAlert()}
      <div className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <a
            className="text-#334155 text-sm uppercase hidden lg:inline-block font-semibold"
            href="/admin/dashboard"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddClass();
              setClassCodeEntered("");
            }}
            className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
          >
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i
                  class="fa fa-plus-circle"
                  aria-hidden="true"
                  onClick={(event) => {
                    event.preventDefault();
                    handleAddClass();
                    setClassCodeEntered("");
                  }}
                ></i>
              </span>
              <input
                type="text"
                placeholder="Enter Class Code"
                value={classCodeEntered}
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
      </div>
    </>
  );
}
