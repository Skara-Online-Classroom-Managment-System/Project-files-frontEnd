/*eslint-disable*/
import React from "react";
import axios from "axios";
import { Redirect, Link, useHistory } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [classData, setclassData] = React.useState({
    classesEnrolled: [],
  });
  const [redirect, setRedirect] = React.useState(false);
  const [details, setDetails] = React.useState({
    className: String,
  });
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
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
      }
    });
  }
  if (redirect) {
    console.log(redirect);
    return <Redirect to='/admin/dashboard' />;
  }

  function handleChange(event) {
    const value = event.target.value;
    setDetails({
      className: value,
    });
  }
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/dashboard",
    }).then((res) => {
      setclassData(res.data.details);
      console.log(res.data);
    });
  }, [classData.length]);

  let toshow = null;
  if (classData.classesEnrolled) {
    toshow = (
      <ul>
        {classData.classesEnrolled.map((item, index) => {
          return (
            <li className='items-center'>
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/maps") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to={"/classroom/" + index}
                onClick={() => <Redirect to={"/classroom/" + index} />}
              >
                <i
                  className={
                    "fas fa-book mr-2 text-sm mb-2 " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                {item.className.length < 17
                  ? item.className
                  : item.className.substring(0, 17) + "..."}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <nav className='md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6'>
        <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
          {/* Toggler */}
          <button
            className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
            type='button'
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className='fas fa-bars'></i>
          </button>
          {/* Brand */}
          <Link
            className='md:block w-6/12 text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
            to='/'
          >
            Skara
          </Link>
          {/* User */}
          <ul className='md:hidden items-center flex flex-wrap list-none'>
            <li className='inline-block relative'>
              <NotificationDropdown />
            </li>
            <li className='inline-block relative'>
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link
                    className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
                    to='/'
                  >
                    Skara
                  </Link>
                </div>
                <div className='w-6/12 flex justify-end'>
                  <button
                    type='button'
                    className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className='mt-6 mb-4 md:hidden'>
              <div className='mb-3 pt-0'>
                <input
                  type='text'
                  value={details.className}
                  onChange={handleChange}
                  placeholder='Enter class name'
                  className='border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal'
                />
              </div>
            </form>
            {/* Divider */}
            <hr className='my-4 md:min-w-full' />

            {/* Navigation */}

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              <li className='items-center'>
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to='/admin/dashboard'
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>

              {/* Divider */}
              <hr className='my-4 md:min-w-full' />

              {/* Heading */}
              <h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
                Classes Enrolled
              </h6>

              {toshow}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
{
  /* <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/settings") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/settings"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Settings
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/tables") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/tables"
                >
                  <i
                    className={
                      "fas fa-table mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/tables") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Tables
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Maps
                </Link>

              </li>
            </ul> */
}
