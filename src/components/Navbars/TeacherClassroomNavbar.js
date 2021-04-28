import React from "react";
import { Redirect, useHistory, Link, useParams } from "react-router-dom";
import axios from "axios";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  console.log("inside teacher navbar");
  const { pos } = useParams();
  return (
    <>
      {/* Navbar */}
      <nav className='absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4'>
        <div className='w-full mx-autp items-center flex md:flex-nowrap flex-wrap md:px-10 px-4'>
          <Link
            className='text-#334155 text-sm uppercase hidden lg:inline-block font-semibold mx-4'
            to={"/classroom/" + pos}
          >
            Stream
          </Link>
          <Link
            className='text-#334155 text-sm uppercase hidden lg:inline-block font-semibold mx-4'
            to={"/classroom/" + pos + "/people"}
          >
            People
          </Link>
          <Link
            className='text-#334155 text-sm uppercase hidden lg:inline-block font-semibold mx-4'
            to={"/classroom/" + pos + "/teams"}
          >
            Teams
          </Link>
        </div>
        <ul className='flex-col md:flex-row list-none items-end hidden md:flex'>
          <UserDropdown />
        </ul>
      </nav>
      {/* End Navbar */}
    </>
  );
}
