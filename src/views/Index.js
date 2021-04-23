import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      const loadedData = res.data;
      setUserData(loadedData);
      setIsLoggedIn(true);
    });
  }, [userData.length]);

  async function handleLogOut() {
    await fetch("http://localhost:5000/logout", {
      method: "GET",
      credentials: "include",
    });
  }
  return (
    <>
      <IndexNavbar fixed status={isLoggedIn} />
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px' style = {{backgroundColor : '#C7ECFA'}} >
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='pt-32 sm:pt-0'>
              <h2 className='font-semibold text-4xl text-blueGray-600'>
                Skara - online learning, revolutionized
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
              Skara is a free online tool for teachers and students that helps to make designing,
               sharing, and grading assignments easier. Skara's main goal is to make the process of exchanging 
               files between teachers and students as simple as possible.{" "}
                <a
                  href='https://tailwindcss.com/?ref=creativetim'
                  className='text-blueGray-600'
                  target='_blank'
                >
                 
                </a>
                
              </p>
              <div className='mt-12'>
                {!isLoggedIn ? (
                  <Link
                    target='_blank'
                    className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    to='/auth/login'
                  >
                    Log in
                  </Link>
                ) : (
                  <Link
                    target='_blank'
                    className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    to='/admin/dashboard'
                  >
                    Dashboard
                  </Link>
                )}
                {!isLoggedIn ? (
                  <Link
                    className='github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    target='_blank'
                    to='/auth/register'
                  >
                    Sign Up
                  </Link>
                ) : (
                  <Link
                    target='_self'
                    className='github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    to='/'
                    onClick={handleLogOut}
                  >
                    Log out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <img
          width='300px'
          className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-600px'
          src={require("assets/img/learning.gif").default}
          alt='...'
        />
      </section>

      <section className='mt-48 md:mt-40 pb-40 relative bg-blueGray-100' style = {{backgroundColor : '#C7ECFA'}}>
        <div
          className='-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20'
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
            
          </svg>
        </div>
        <div className='container mx-auto'>
          <div className='flex flex-wrap items-center'>
            <div className='w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500'>
                <img
                  alt='...'
                  src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
                  className='w-full align-middle rounded-t-lg'
                />
                <blockquote className='relative p-8 mb-4'>
                  <svg
                    preserveAspectRatio='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 583 95'
                    className='absolute left-0 w-full block h-95-px -top-94-px'
                  >
                    
                  </svg>
                  <h4 className='text-xl font-bold text-white'>
                    Get the most out your online learning experience.
                  </h4>
                  <p className='text-md font-light mt-2 text-white'>
                  A free and simple app that helps educators manage and 
                  evaluate success while improving relationships
                  with students at classes, at home, and on the go.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className='w-full md:w-6/12 px-4'>
              <div className='flex flex-wrap'>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col mt-4'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-sitemap'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Manage multiple classes
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Notus React c.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-drafting-compass'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                      Chat with instructors

                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        We also feature many dynamic components for React,
                        NextJS, Vue and Angular.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col min-w-0 mt-4'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-newspaper'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>Work in teams</h6>
                      <p className='mb-4 text-blueGray-500'>
                        This extension also comes with 3 sample pages. They are
                        fully coded so you can start working instantly.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-file-alt'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Keep track of your submissions
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Built by developers for developers. You will love how
                        easy is to to work with Notus React.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-4 pb-32 pt-48'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full md:w-5/12 ml-auto px-12 md:px-4'>
              <div className='md:pr-12'>
                <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                  <i className='fas fa-file-alt text-xl'></i>
                </div>
                <h3 className='text-3xl font-semibold'>
                  Complex Documentation
                </h3>
                <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                  This extension comes a lot of fully coded examples that help
                  you get started faster. You can adjust the colors and also the
                  programming language. You can change the text and images and
                  you're good to go.
                </p>
                <ul className='list-none mt-6'>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='fas fa-fingerprint'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Built by Developers for Developers
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='fab fa-html5'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Carefully crafted code for Components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='far fa-paper-plane'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Dynamic Javascript Components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0'>
              <img
                alt='...'
                className='mx-auto w-70'
                style={{}}
                src={require("assets/img/Studyingedge.png").default}
              />
            </div>
          </div>
        </div>

        <div className='justify-center text-center flex flex-wrap mt-24'>
          <div className='w-full md:w-6/12 px-12 md:px-4'>
            <h2 className='font-semibold text-4xl'>Beautiful Example Pages</h2>
            <p className='text-lg leading-relaxed mt-4 mb-4 text-blueGray-500'>
              Notus React is a completly new product built using our past
              experience in web templates. Take the examples we made for you and
              start playing with them.
            </p>
          </div>
        </div>
      </section>

      <section className='block relative z-1 bg-blueGray-600'>
        <div className='container mx-auto'>
          <div className='justify-center flex flex-wrap'>
            <div className='w-full lg:w-12/12 px-4  -mt-24'>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Login Page
                  </h5>
                  <Link to='/auth/login'>
                    <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src={require("assets/img/login.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Profile Page
                  </h5>
                  <Link to='/profile'>
                    <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src={require("assets/img/profile.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Landing Page
                  </h5>
                  <Link to='/landing'>
                    <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src={require("assets/img/landing.jpg").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-20 bg-blueGray-600 overflow-hidden' style = {{backgroundColor : '#C7ECFA'}}>
        <div className='container mx-auto pb-64'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64'>
              <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                <i className='fas fa-code-branch text-xl'></i>
              </div>
              <h3 className='text-3xl mb-2 font-semibold leading-normal text-white'>
                Open Source
              </h3>
              <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400'>
                Since{" "}
                <a
                  href='https://tailwindcss.com/?ref=creativetim'
                  className='text-blueGray-300'
                  target='_blank'
                >
                  Tailwind CSS
                </a>{" "}
                is an open source project we wanted to continue this movement
                too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p className='text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400'>
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href='https://github.com/creativetimofficial/notus-react?ref=nr-index'
                target='_blank'
                className='github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg'
              >
                Github Star
              </a>
            </div>

            <div className='w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative'>
              <i className='fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55'></i>
            </div>
          </div>
        </div>
      </section>

      <section className='pb-16 bg-blueGray-200 relative pt-32'>
        <div
          className='-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20'
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
            
          </svg>
        </div>

        
      </section>
      <Footer />
    </>
  );
}
