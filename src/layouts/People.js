import React from "react";

// components

import TeacherClassroomNavbar from "components/Navbars/TeacherClassroomNavbar.js";
import ClassroomSidebar from "components/Sidebar/ClassroomSidebar.js";

// views

import Tables from "views/admin/Tables.js";

export default function Admin() {


  return (
    <>
      <ClassroomSidebar />
      <div className='relative md:ml-64 bg-blueGray-100'>
        <TeacherClassroomNavbar />
        <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
          <div className='px-4 md:px-10 mx-auto w-full'>
            <div>
              <Tables />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
