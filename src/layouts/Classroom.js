import React from "react";
import { Switch, Route, Redirect, Link, useParams } from "react-router-dom";
import axios from "axios";

// components

import StudentAdminNavbar from "components/Navbars/StudentAdminNavbar.js";
import TeacherAdminNavbar from "components/Navbars/TeacherAdminNavbar.js";
import StudentSidebar from "components/Sidebar/StudentSidebar.js";
import TeacherSidebar from "components/Sidebar/TeacherSidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import CardStats from "components/Cards/CardStats.js";
import { directive } from "@babel/types";

export default function Admin() {
  const [classData, setclassData] = React.useState({});
  const [type, setType] = React.useState(null);
  const { pos } = useParams();
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/classroom/",
      params: {
        pos: pos,
      },
    }).then((res) => {
      setclassData(res.data.classData);
      setType(res.data.type);
    });
  }, [classData.length]);

  let toshow = null;
  if (type && classData) {
    toshow = (
      <>
        {type === 1 ? (
          <>
            {" "}
            <StudentSidebar />
            <div className='relative md:ml-64 bg-blueGray-100'>
              <StudentAdminNavbar />
              {/* {studentData.classesEnrolled.map((currentClass, index) => (
                <Link to={"/studentclassroom/" + currentClass.className}>
                  <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
                    <div className='px-4 md:px-10 mx-auto w-full'>
                      <div>
                        <div className='flex flex-wrap'>
                          <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                            <CardStats
                              statSubtitle={currentClass.teachers[0].firstName}
                              statTitle={currentClass.className}
                              statArrow='up'
                              statPercent={currentClass.studentsEnrolled.length}
                              statPercentColor='text-emerald-500'
                              statDescripiron='Students Enrolled'
                              statIconName='far fa-chart-bar'
                              statIconColor='bg-red-500'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))} */}
              <div className='px-4 md:px-10 mx-auto w-full -m-24'>
                <Switch>
                  <Route path='/admin/dashboard' exact component={Dashboard} />
                  <Route path='/admin/maps' exact component={Maps} />
                  <Route path='/admin/settings' exact component={Settings} />
                  <Route path='/admin/tables' exact component={Tables} />
                  <Redirect from='/admin' to='/admin/dashboard' />
                </Switch>
                <FooterAdmin />
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <TeacherSidebar />
            <div className='relative md:ml-64 bg-blueGray-100'>
              <TeacherAdminNavbar />
              {/* {studentData.classesEnrolled.map((currentClass, index) => (
                <Link to={"/studentclassroom/" + currentClass.className}>
                  <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
                    <div className='px-4 md:px-10 mx-auto w-full'>
                      <div>
                        <div className='flex flex-wrap'>
                          <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                            <CardStats
                              statSubtitle={currentClass.teachers[0].firstName}
                              statTitle={currentClass.className}
                              statArrow='up'
                              statPercent={currentClass.studentsEnrolled.length}
                              statPercentColor='text-emerald-500'
                              statDescripiron='Students Enrolled'
                              statIconName='far fa-chart-bar'
                              statIconColor='bg-red-500'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))} */}
              <div className='px-4 md:px-10 mx-auto w-full -m-24'>
                <Switch>
                  <Route path='/admin/dashboard' exact component={Dashboard} />
                  <Route path='/admin/maps' exact component={Maps} />
                  <Route path='/admin/settings' exact component={Settings} />
                  <Route path='/admin/tables' exact component={Tables} />
                  <Redirect from='/admin' to='/admin/dashboard' />
                </Switch>
                <FooterAdmin />
              </div>
            </div>{" "}
          </>
        )}
      </>
    );
  }
  return (
    <>
      {toshow}
      {/* <Sidebar />
      <div className='relative md:ml-64 bg-blueGray-100'>
        <AdminNavbar />
        {studentData.classesEnrolled.map((currentClass, index) => (
          <Link to={"/studentclassroom/" + currentClass.className}>
            <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
              <div className='px-4 md:px-10 mx-auto w-full'>
                <div>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                      <CardStats
                        statSubtitle={currentClass.teachers[0].firstName}
                        statTitle={currentClass.className}
                        statArrow='up'
                        statPercent={currentClass.studentsEnrolled.length}
                        statPercentColor='text-emerald-500'
                        statDescripiron='Students Enrolled'
                        statIconName='far fa-chart-bar'
                        statIconColor='bg-red-500'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className='px-4 md:px-10 mx-auto w-full -m-24'>
          <Switch>
            <Route path='/admin/dashboard' exact component={Dashboard} />
            <Route path='/admin/maps' exact component={Maps} />
            <Route path='/admin/settings' exact component={Settings} />
            <Route path='/admin/tables' exact component={Tables} />
            <Redirect from='/admin' to='/admin/dashboard' />
          </Switch>
          <FooterAdmin />
        </div>
      </div> */}
    </>
  );
}
