import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import PersonIcon from "@material-ui/icons/Person";

export default function Profile() {
  const [userData, setUserData] = React.useState({ classesEnrolled: [] });
  const [type, setType] = React.useState();
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    console.log("dashboard");
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/dashboard",
    }).then((res) => {
      setUserData(res.data.details);
      setType(res.data.type);
      console.log(res.data);
    });
  }, [userData.length]);
  function handleDelete() {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/deleteprofile",
    }).then((res) => {
      setRedirect(true);
    });
  }
  if (redirect) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <Navbar transparent />
      <main className='profile-page'>
        <section className='relative block h-500-px'>
          <div
            className='absolute top-200 w-full h-full bg-center bg-cover'
            style={{
              backgroundImage:
                "url(" + require("assets/img/loginbg.png").default + ")",
            }}
          ></div>
          <div
            className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px'
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='text-blueGray-200 fill-current'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
        </section>
        <section className='relative py-16 bg-blueGray-200'>
          <div className='container mx-auto px-4'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                    <div className='relative'>
                      <img
                        alt='...'
                        src={require("assets/img/porple.png").default}
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                      />
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                    <div className='py-6 px-3 mt-32 sm:mt-0'>
                      <Link to='/admin/dashboard'>
                        <button
                          className='bg-lightBlue-500 active:bg-#C7ECFA-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                          type='button'
                        >
                          Dashboard
                        </button>
                      </Link>
                      <button
                        className='bg-red-500 active:bg-#C7ECFA-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={handleDelete}
                      >
                        Delete Profile
                      </button>
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-1'>
                    <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          {userData.classesEnrolled.length}
                        </span>
                        <span className='text-sm text-blueGray-400'>
                          Classes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-12'>
                  <h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2'>
                    {userData.firstName + " " + userData.lastName}
                  </h3>
                  <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                    {userData.username}
                  </div>
                  {type === 1 ? (
                    <div className='mb-2 text-blueGray-600 mt-10'>
                      <i className='fas fa-briefcase mr-2 text-lg text-blueGray-400'></i>
                      Student
                    </div>
                  ) : null}
                  {type === 2 ? (
                    <div className='mb-2 text-blueGray-600'>
                      <i className='fas fa-university mr-2 text-lg text-blueGray-400'></i>
                      Teacher
                    </div>
                  ) : null}
                </div>
                <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                  <div className='flex flex-wrap justify-center'>
                    <div className='w-full lg:w-9/12 px-4'>
                      <p className='mb-4 text-lg leading-relaxed text-blueGray-700'></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
