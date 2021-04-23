import React from "react";
import { Switch, Route, Redirect, Link, useParams } from "react-router-dom";
import axios from "axios";

// components

import ClassroomNavbar from "components/Navbars/TeacherClassroomNavbar.js";
import TeacherSidebar from "components/Sidebar/TeacherSidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

// import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";
import CardStats from "components/Cards/CardStats.js";
// import CardAddAnnouncement from "components/Cards/CardAddAnnouncement.js";
// import { directive } from "@babel/types";

export default function Admin() {
  const [teamData, setTeamData] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [teamName, setTeamName] = React.useState("");
  const [teamCode, setTeamCode] = React.useState("");
  const [studentChat, setStudentChat] = React.useState({
    message: "",
  });
  const [teacherChat, setTeacherChat] = React.useState({
    message: "",
  });
  const [studentChatData, setStudentChatData] = React.useState({});
  const [teacherChatData, setTeacherChatData] = React.useState({});
  const { pos } = useParams();
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/teams",
      params: {
        pos: pos,
      },
    }).then((res) => {
      console.log("team-data", res.data);
      setTeamData(res.data.teamData);
      setType(res.data.type);
    });
  }, [pos]);

  function handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;
    if (name === "teamName") {
      setTeamName(val);
      setTeamCode("");
    } else {
      setTeamCode(val);
      setTeamName("");
    }
  }

  function handleJoinTeam(event) {
    event.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/classroom/jointeam",
      data: {
        teamCode: teamCode,
        pos: pos,
      },
    }).then((res) => {
      if (res.data.teamData) {
        setTeamData(res.data.teamData);
      } else {
      }
    });
  }

  function handleCreateTeam(event) {
    event.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/classroom/createteam",
      data: {
        name: teamName,
        pos: pos,
      },
    }).then((res) => {
      if (res.data.teamData) {
        setTeamData(res.data.teamData);
        console.log(res.data.teamData);
      } else {
      }
    });
  }

  function handleStudentChat(event) {
    event.preventDefault();
    setStudentChat({
      message: event.target.value,
    });
    // setChat(data);
  }

  function submitStudentChat() {
    console.log("chat submitted");
    axios({
      method: "POST",
      data: {
        message: studentChat.message,
        id: teamData._id,
        pos: pos,
      },
      withCredentials: true,
      url: "http://localhost:5000/createChat",
    }).then((res) => {
      console.log(res.data.class, "team chat");
      setStudentChatData(res.data.class);
    });
  }
  function handleTeacherChat(event) {
    event.preventDefault();
    setTeacherChat({
      message: event.target.value,
    });
    // setChat(data);
  }

  function submitTeacherChat() {
    console.log("chat submitted");
    axios({
      method: "POST",
      data: {
        message: teacherChat.message,
        id: teamData._id,
        pos: pos,
      },
      withCredentials: true,
      url: "http://localhost:5000/teacherChat",
    }).then((res) => {
      console.log(res.data.class, "team chat");
      setTeacherChatData(res.data.class);
    });
  }

  let toshowteam = null;

  if (type === 2 && teamData) {
    toshowteam = teamData.map((currentTeam, index) => (
      <Link to={"/classroom/" + pos + "/teams/" + index}>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-12/12 xl:w-12/12 px-4 mb-5 '>
            <CardStats
              statSubtitle={currentTeam.members.reduce(function (
                total,
                currentMember
              ) {
                return total + currentMember.firstName + " ";
              },
              "")}
              statTitle={currentTeam.teamName}
              statArrow='up'
              statPercent={currentTeam.members.length}
              statPercentColor='text-emerald-200'
              statDescription='Members'
              statIconName='far fa-calendar-minus'
              statIconColor='bg-red-500'
            />
          </div>

          {/* <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
            <div className='px-4 py-5 flex-auto'>
              <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400'>
                <i class='fas fa-users'></i>
              </div>
              <h6 className='text-xl font-semibold'>{currentTeam.teamName}</h6>
              <p className='mt-2 mb-4 text-blueGray-500'>
                {currentTeam.members.map(
                  (currentMember, index) =>
                    currentMember.firstName + " " + currentMember.lastName
                )}
              </p>
            </div>
          </div>
        </div> */}
        </div>
      </Link>
    ));
  }

  console.log(teamData, "teamdata");
  return (
    <>
      {type === 1 ? (
        <>
          <TeacherSidebar />
          <div className='relative md:ml-64 bg-blueGray-100'>
            <ClassroomNavbar />
            <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
              <div className='container mx-auto px-4'>
                <div>
                  <div className='flex flex-wrap'>
                    {teamData ? (
                      <>
                        <div className='w-full lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                          <CardStats
                            statSubtitle={teamData.members.reduce(function (
                              total,
                              currentMember
                            ) {
                              return total + currentMember.firstName + " ";
                            },
                            "")}
                            statTitle={teamData.teamName}
                            statArrow='up'
                            statPercent={teamData.members.length}
                            statPercentColor='text-emerald-200'
                            statDescription='Members'
                            statIconName='far fa-calendar-minus'
                            statIconColor='bg-red-500'
                          />
                        </div>
                        <>
                          <div className='px-4 md:px-10 mx-auto w-full -m-12'>
                            <div className='flex flex-wrap'>
                              <div className='w-full xl:w-12/12 mb-12 xl:mb-0 px-4'>
                                <div className='relative flex flex-col h-full min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700'>
                                  <div className='rounded-t mb-0 px-4 py-3 bg-transparent'>
                                    <div className='flex flex-wrap items-center'>
                                      <div className='relative w-full max-w-full flex-grow flex-1'>
                                        <h6 className='uppercase text-blueGray-100 mb-1 text-xs font-semibold'></h6>
                                        <h2 className='text-white text-xl font-semibold'>
                                          Chat with Team
                                        </h2>
                                        <div className='w-full'>
                                          <hr className='my-4 md:min-w-full' />
                                          <input
                                            className='w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 outline-none focus:border-emerald-500'
                                            placeholder='enter message'
                                            value={teacherChat.message}
                                            onChange={handleTeacherChat}
                                          />
                                          <button
                                            className='text-white w-full bg-emerald-500 rounded mt-3 p-2'
                                            onClick={(event) => {
                                              event.preventDefault();
                                              submitTeacherChat();
                                              setTeacherChat({
                                                message: "",
                                              });
                                            }}
                                          >
                                            SEND
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='p-4 text-white flex-auto'></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className='flex flex-wrap'>
                            <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
                              <div className='relative flex flex-col h-full min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700'>
                                <div className='rounded-t mb-0 px-4 py-3 bg-transparent'>
                                  <div className='flex flex-wrap items-center'>
                                    <div className='relative w-full max-w-full flex-grow flex-1'>
                                      <h6 className='uppercase text-blueGray-100 mb-1 text-xs font-semibold'>
                                        <button>Team Chat</button>
                                      </h6>
                                      <h2 className='text-white text-xl font-semibold'>
                                        Sales value
                                      </h2>

                                      <input
                                        placeholder='enter message'
                                        value={studentChat.message}
                                        onChange={handleStudentChat}
                                      />
                                      <button
                                        className='text-white'
                                        onClick={(event) => {
                                          event.preventDefault();
                                          submitStudentChat();
                                          setStudentChat({
                                            message: "",
                                          });
                                        }}
                                      >
                                        POST
                                      </button>
                                      <input
                                        placeholder='enter message'
                                        value={teacherChat.message}
                                        onChange={handleTeacherChat}
                                      />
                                      <button
                                        className='text-white'
                                        onClick={(event) => {
                                          event.preventDefault();
                                          submitTeacherChat();
                                          setTeacherChat({
                                            message: "",
                                          });
                                        }}
                                      >
                                        POST
                                      </button>
                                    </div>
                                  </div>
                                  <div className='p-4 text-white flex-auto'></div>
                                </div>
                              </div>
                            </div>
                            <div className='w-full xl:w-4/12 px-4'>
                              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
                                <div className='rounded-t mb-0 px-4 py-3 bg-transparent'>
                                  <div className='flex flex-wrap items-center'>
                                    <div className='relative w-full max-w-full flex-grow flex-1'>
                                      <h6 className='uppercase text-blueGray-400 mb-1 text-xs font-semibold'>
                                        Performance
                                      </h6>
                                      <h2 className='text-blueGray-700 text-xl font-semibold'>
                                        Total orders
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </>
                      </>
                    ) : (
                      <>
                        <div className='lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center'>
                          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                            <div className='px-4 py-5 flex-auto'>
                              <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400'>
                                <i className='fas fa-award'></i>
                              </div>
                              <h6 className='text-xl font-semibold'>
                                Create Team
                              </h6>
                              <form class='w-full mt-3'>
                                <input
                                  type='text'
                                  placeholder='Team Name'
                                  className='w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 outline-none focus:border-emerald-500'
                                  name='teamName'
                                  value={teamName}
                                  onChange={handleChange}
                                />
                                <button
                                  type='submit'
                                  className='text-white w-full bg-emerald-500 rounded mt-3 p-2'
                                  onClick={handleCreateTeam}
                                >
                                  CREATE
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className='lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center'>
                          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                            <div className='px-4 py-5 flex-auto'>
                              <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400'>
                                <i className='fas fa-award'></i>
                              </div>
                              <h6 className='text-xl font-semibold'>
                                Join Team
                              </h6>
                              <form class='w-full mt-3'>
                                <input
                                  type='text'
                                  placeholder='Team Code'
                                  className='w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 outline-none focus:border-emerald-500'
                                  name='teamCode'
                                  value={teamCode}
                                  onChange={handleChange}
                                />
                                <button
                                  type='submit'
                                  className='text-white w-full bg-emerald-500 rounded mt-3 p-2'
                                  onclick={handleJoinTeam}
                                >
                                  JOIN
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
            <ClassroomNavbar />

            <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
              <div className='container mx-auto px-4'>
                <div>
                  <div className='flex flex-wrap'>
                    {toshowteam}
                    {/* <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div className="px-4 py-5 flex-auto">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                            <i className="fas fa-award"></i>
                          </div>
                          <h6 className="text-xl font-semibold">Enrolled</h6>
                          <p className="mt-2 mb-4 text-blueGray-500">
                            Divide details about your product or agency work
                            into parts. A paragraph describing a feature will be
                            enough.
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}