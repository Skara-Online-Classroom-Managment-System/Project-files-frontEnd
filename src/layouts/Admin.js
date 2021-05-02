import React from "react";
import { Switch, Route, Redirect, Link, withRouter } from "react-router-dom";
import axios from "axios";

// components

import StudentAdminNavbar from "components/Navbars/StudentAdminNavbar.js";
import TeacherAdminNavbar from "components/Navbars/TeacherAdminNavbar.js";
import StudentSidebar from "components/Sidebar/StudentSidebar.js";
import TeacherSidebar from "components/Sidebar/TeacherSidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import CardStats from "components/Cards/CardStats.js";

const Das = () => {
  const [studentData, setstudentData] = React.useState({ classesEnrolled: [] });
  const [type, setType] = React.useState();
  React.useEffect(() => {
    console.log("dashboard");
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/dashboard",
    }).then((res) => {
      setstudentData(res.data.details);
      setType(res.data.type);
      console.log(res.data.details, "dashboard");
    });
  }, [studentData.length, studentData.classesEnrolled.length]);
  return (
    <>
      {type === 1 ? (
        <>
          <StudentSidebar />
          <div className='relative md:ml-64 bg-blueGray-100'>
            <StudentAdminNavbar />
            {/* Header */}
            <div
              className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'
              style={{ backgroundColor: "#C7ECFA" }}
            >
              <div className='px-4 md:px-10 mx-auto w-full'>
                <div>
                  <div className='flex flex-wrap'>
                    {studentData.classesEnrolled.map((currentClass, index) => (
                      <div className='w-full lg:w-6/12 xl:w-3/12 px-4 mb-8'>
                        <Link to={"/classroom/" + index}>
                          <CardStats
                            statSubtitle={currentClass.teachers[0].firstName}
                            statTitle={
                              currentClass.className.length < 13
                                ? currentClass.className
                                : currentClass.className.substring(0, 13) +
                                  "..."
                            }
                            statArrow='up'
                            statPercent={currentClass.studentsEnrolled.length}
                            statPercentColor='text-emerald-500'
                            statDescripiron='Students Enrolled'
                            statIconName='fas fa-book'
                            statIconColor='bg-emerald-500'
                            key={index}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <TeacherSidebar />
          <div className='relative md:ml-64 bg-blueGray-100'>
            <TeacherAdminNavbar />
            {/* Header */}

            <div
              className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'
              style={{ backgroundColor: "#C7ECFA" }}
            >
              <div className='px-4 md:px-10 mx-auto w-full'>
                <div>
                  <div className='flex flex-wrap'>
                    {studentData.classesEnrolled.map((currentClass, index) => (
                      <div className='w-full lg:w-6/12 xl:w-3/12 px-4 mb-8'>
                        <Link to={"/classroom/" + index}>
                          <CardStats
                            statTitle={
                              currentClass.className.length < 13
                                ? currentClass.className
                                : currentClass.className.substring(0, 13) +
                                  "..."
                            }
                            statSubtitle={
                              "Students Enrolled: " + currentClass.studentsEnrolled.length
                            }
                            statArrow='up'
                            statPercent={currentClass.classCode}
                            statPercentColor='text-emerald-500'
                            statDescripiron='Class Code'
                            statIconName='fas fa-book'
                            statIconColor='bg-emerald-500'
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className='px-4 md:px-10 mx-auto w-full -m-24'>
        <Route path='/admin/dashboard' exact component={Dashboard} />
        <Route path='/admin' />
        <Redirect from='/admin' to='/admin/dashboard' />

        <FooterAdmin />
      </div>
      {/* </div> */}
    </>
  );
};
export default withRouter(Das);
