import React from "react";
import {  useParams, withRouter } from "react-router-dom";
import axios from "axios";

// components

import StudentClassroomNavbar from "components/Navbars/StudentClassroomNavbar.js";
import TeacherClassroomNavbar from "components/Navbars/TeacherClassroomNavbar.js";
import ClassroomSidebar from "components/Sidebar/ClassroomSidebar.js";
import FooterSmall from "components/Footers/FooterClassroom.js";

// views

import CardStats from "components/Cards/CardStats.js";
import CardClassTitle from "components/Cards/CardClassTitle.js";
import CardAddAnnouncement from "components/Cards/CardAddAnnouncement.js";

const Admin=()=> {
  const [classData, setclassData] = React.useState({});
  const [type, setType] = React.useState(null);
  const { pos } = useParams();
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/classroom",
      params: {
        pos: pos,
      },
    }).then((res) => {
      console.log(res.data.classData);
      setclassData(function (prev) {
        const a = res.data.classData;
        a.announcements.reverse();
        return a;
      });
      setType(res.data.type);
    });
  }, [classData.length]);
  console.log(classData, "classroom");
  let toshow = null;
  if (type && classData.announcements) {
    toshow = (
      <>
        {type === 1 ? (
          <>
            <ClassroomSidebar />
            <div className='relative md:ml-64 bg-blueGray-100' style = {{backgroundColor : '#C7ECFA'}} >
              <StudentClassroomNavbar />
              <div className='relative bg-#C7ECFA md:pt-32 pb-32 pt-12'>
                <div className='px-4 md:px-10 mx-auto w-full'>
                  <div>
                    <div className='flex flex-wrap'>
                      <div className='w-full lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                        <CardClassTitle
                          statTitle={classData.className}
                          statArrow='up'
                          statPercentColor='text-emerald-200'
                          statIconColor='bg-transparent'
                        />
                      </div>
                    </div>
                    {classData.announcements.map(
                      (currentAnnouncement, index) => (
                        <div className='flex flex-wrap'>
                          <div className='w-full lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                            <CardStats
                              statSubtitle={
                                currentAnnouncement.author.firstName
                              }
                              statTitle={currentAnnouncement.text}
                              statArrow='up'
                              statPercent={currentAnnouncement.time}
                              statPercentColor='text-emerald-200'
                              statIconName='far fa-calendar-minus'
                              statIconColor='bg-emerald-500'
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <ClassroomSidebar />
            <div className='relative md:ml-64 bg-blueGray-100' style = {{backgroundColor : '#C7ECFA'}}>
              <TeacherClassroomNavbar />

              <div className='relative bg-#C7ECFA md:pt-32 pb-32 pt-12' style = {{backgroundColor : '#C7ECFA'}} >
                <div className='px-4 md:px-10 mx-auto w-full'>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                      <CardClassTitle
                        statTitle={classData.className}
                        statArrow='up'
                        statPercentColor='text-emerald-200'
                        statIconColor='bg-transparent'
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap'>
                    <div className='w-full my-4 lg:w-11/12 xl:w-11/12 px-4'>
                      <CardAddAnnouncement
                        statIconName='fas fa-plus'
                        statIconColor='bg-emerald-500'
                      />
                    </div>
                  </div>
                  {classData.announcements.map((currentAnnouncement, index) => (
                    <div className='flex flex-wrap'>
                      <div className='w-full lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                        <CardStats
                          announcementPos={index}
                          statSubtitle={currentAnnouncement.author.firstName}
                          statTitle={currentAnnouncement.text}
                          statArrow='up'
                          statPercent={currentAnnouncement.time}
                          statPercentColor='text-emerald-200'
                          statIconName='fas fa-trash'
                          statIconColor='bg-emerald-500'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
  return <>{toshow}
  <div className="-mt-20">
      </div></>;
}
export default withRouter(Admin);