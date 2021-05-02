import React from "react";
import axios from "axios";

import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Register from "views/auth/Register.js";
var Link = require('react-router-dom').Link

export default function Login() {
  const [selection, setSelection] = React.useState(1);
  const [redirect, setRedirect] = React.useState(false);
  const [details, setDetails] = React.useState({
    username: "",
    password: "",
  });

  async function handleSubmit() {
    const queryParam = selection === 1 ? "student" : "teacher";
    const response = await fetch(
      "http://localhost:5000/" + queryParam + "login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...details,
        }),
      }
    );
    const content = await response.json();
    if (response.status === 201) {
      console.log(content);
    } else {
      setRedirect(true);
      console.log(content);
    }
  }

  if (redirect) {
    return <Redirect to='/admin/dashboard' />;
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "password") {
      setDetails(function (prev) {
        const newVal = {
          ...prev,
          [name]: value,
        };
        return newVal;
      });
    } else {
      setDetails(function (prev) {
        const newVal = {
          ...prev,
          username: value,
        };
        return newVal;
      });
    }
  }
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/loginbg.png").default + ")",
            }}
          ></div>
          
     
      
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-blueGray-500 text-sm font-bold'>
                    Team Submissions
                  </h6>
                </div>
                <div className='btn-wrapper text-center'>
                  
                  
                </div>
                <hr className='mt-6 border-b-1 border-blueGray-300' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <form>
                  {selection === 0 ? (
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Email
                      </label>
                      <input
                        type='email'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        placeholder='Email'
                        autoComplete='off'
                        onChange={handleChange}
                        name='email'
                        value={details.username}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Enter URL
                      </label>
                      <input
                        type='string'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        placeholder='Enter URL'
                        onChange={handleChange}
                        name='sid'
                        value={details.username}
                      />
                    </div>
                  )}

                  
                  <div>
                    
                  </div>

                  <div className='text-center mt-6'>
                    <button
                      className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      type='button'
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                {/* <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-blueGray-200'
                >
                  <small>Forgot password?</small>
                </a> */}
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
