import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Footer from "components/Footers/Footer.js";
import DevicesIcon from "@material-ui/icons/Devices";
import useFullPageLoader from "components/Hooks/useFullPageLoader.js";
// import { Laptop } from "@material-ui/icons";

const Ind = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [redirect, setRedirect] = React.useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  React.useEffect(() => {
    showLoader();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      hideLoader();
      const loadedData = res.data;
      setUserData(loadedData);
      setIsLoggedIn(true);
    });
  }, [userData.length, showLoader, hideLoader]);

  async function handleLogOut() {
    showLoader();
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      // hideLoader();
      setRedirect(true);
    });
  }
  if (redirect) {
    console.log("redirect", redirect);
    window.location.reload();
  }
  return (
    <>
      <IndexNavbar fixed status={isLoggedIn} />
      <section
        className='header relative pt-16 items-center flex h-screen max-h-860-px'
        style={{ backgroundColor: "#C7ECFA" }}
      >
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='pt-32 sm:pt-0'>
              <h2 className='font-semibold text-4xl text-blueGray-600'>
                Skara - online learning, revolutionized
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                Skara is a free online tool for teachers and students that helps
                to make designing, sharing, and grading assignments easier.
                Skara's main goal is to make the process of exchanging files
                between teachers and students as simple as possible.
              </p>
              <div className='mt-12'>
                {!isLoggedIn ? (
                  <Link
                    // target='_blank'
                    className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    to='/auth/login'
                  >
                    Log in
                  </Link>
                ) : (
                  <Link
                    // target='_blank'
                    className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    to='/admin/dashboard'
                  >
                    Dashboard
                  </Link>
                )}
                {!isLoggedIn ? (
                  <Link
                    className='github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    // target='_blank'
                    to='/auth/register'
                  >
                    Sign Up
                  </Link>
                ) : (
                  <Link
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
          width='200px'
          className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mx-auto sm:mt-0 w-10/12 max-h-100px'
          src={require("assets/img/newgif.gif").default}
          alt='...'
        />
      </section>

      <section
        className='mt-48 md:mt-40 pb-40 relative bg-blueGray-100'
        style={{ backgroundColor: "#C7ECFA" }}
      >
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
          ></svg>
        </div>
        <div className='container mx-auto'>
          <div className='flex flex-wrap items-center'>
            <div className='w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500'>
                <img
                  src={require("assets/img/Devices-bro.png").default}
                  className='w-full align-middle rounded-t-lg'
                />
                <blockquote className='relative p-8 mb-4'>
                  <svg
                    preserveAspectRatio='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 583 95'
                    className='absolute left-0 w-full block h-95-px -top-94-px'
                  ></svg>
                  <h4 className='text-xl font-bold text-white'>
                    Get the most out your online learning experience.
                  </h4>
                  <p className='text-md font-light mt-2 text-white'>
                    A free and simple app that helps educators manage and
                    evaluate success while improving relationships with students
                    at classes, at home, and on the go.
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
                        <MenuBookIcon />
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Manage multiple classes
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Students can manage multiple subjects with just a few
                        clicks
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <LiveHelpIcon />
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Chat with instructors
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Teams can reach out to their instructors and get their
                        doubts addressed at the earliest
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col min-w-0 mt-4'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <PeopleIcon />
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Work in teams
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Students can collaborate with their peers and work on
                        projects together
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <AssignmentTurnedInIcon />
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Keep track of your submissions
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Students can submit their projects in a hassle-free
                        manner
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
                  <DevicesIcon />
                </div>
                <h3 className='text-3xl font-semibold'>
                  User-oriented E-learning experience
                </h3>
                <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                  Enable students, faculty, educators, and staff to meet,
                  collaborate, create content, and share resources - using
                  Skara's easy-to-use interface.
                </p>
                <ul className='list-none mt-6'>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <ViewCarouselIcon fontSize='small' />
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Create virtual classrooms
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <NotificationsActiveIcon fontSize='small' />
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Manage classroom submissions
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <PostAddIcon fontSize='small' />
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Post updates in syllabus
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
                src={require("assets/img/Grill.png").default}
              />
            </div>
          </div>
        </div>

        <div className='justify-center text-center flex flex-wrap mt-24'>
          <div className='w-full md:w-6/12 px-12 md:px-4'>
            <h2 className='font-semibold text-4xl'>A Glimpse into Skara</h2>
            <p className='text-lg leading-relaxed mt-4 mb-4 text-blueGray-500'></p>
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
                  <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                    <img
                      alt='...'
                      className='align-middle border-none max-w-full h-auto rounded-lg'
                      src={require("../../src/assets/img/loginss.png").default}
                    />
                  </div>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Dashboard
                  </h5>

                  <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                    <img
                      alt='...'
                      className='align-middle border-none max-w-full h-auto rounded-lg'
                      src={
                        require("../../src/assets/img/dashboardss.png").default
                      }
                    />
                  </div>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Team Chat
                  </h5>

                  <div className='hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                    <img
                      alt='...'
                      className='align-middle border-none max-w-full h-auto rounded-lg'
                      src={require("../../src/assets/img/chatss.png").default}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className='py-20 bg-blueGray-600 overflow-hidden'
        style={{ backgroundColor: "#C7ECFA" }}
      >
        <div className='container mx-auto pb-64'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64'>
              <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                <i className='fas fa-code-branch text-xl'></i>
              </div>
              <h3 className='text-3xl mb-2 font-semibold leading-normal text-#F9F9FA'>
                Find us on Github
              </h3>

              <p className='text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400'>
                Skara was made through collaboration on Github
              </p>
              <a
                href='https://github.com/Skara-Online-Classroom-Managment-System'
                className='github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg'
              >
                Github
              </a>
            </div>

            <div className='w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative'>
              <i className='fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55'></i>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default withRouter(Ind);
