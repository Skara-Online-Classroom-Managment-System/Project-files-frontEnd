import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactScrollableFeed from "react-scrollable-feed";
// components

import ClassroomNavbar from "components/Navbars/TeacherClassroomNavbar.js";
import TeamSidebar from "components/Sidebar/TeamSidebar.js";

// views
import CardStats from "components/Cards/CardStats.js";
import CardChat from "components/Cards/CardChat.js";
import FooterSmall from "components/Footers/FooterClassroom.js";
import CardAddSubmission from "components/Cards/CardAddSubmission.js";


export default function Admin() {
  const [teamData, setTeamData] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [teamName, setTeamName] = React.useState("");
  const [teamCode, setTeamCode] = React.useState("");
  const [joinTeam, setJoinTeam] = React.useState(false);
  const [createTeam, setCreateTeam] = React.useState(false);
  const [studentChat, setStudentChat] = React.useState({
    message: "",
  });
  const [teacherChat, setTeacherChat] = React.useState({
    message: "",
  });
  const [studentChatData, setStudentChatData] = React.useState({});
  const [teacherChatData, setTeacherChatData] = React.useState({});
  const [selection, setSelection] = React.useState(1);
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
  }, [studentChatData, teacherChatData]);

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
      console.log(res.data.msg);
      setJoinTeam(true);
    });
  }
  if (joinTeam) {
    window.location.reload();
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
      console.log("ok");
      setCreateTeam(true);
    });
  }
  if (createTeam) {
    window.location.reload();
  }

  function handleStudentChat(event) {
    event.preventDefault();
    setStudentChat({
      message: event.target.value,
    });
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
  console.log(type, "type");
  if (type === 1 && teamData) {
    toshowteam = (
      <>
        <TeamSidebar />
        <div
          className='relative md:ml-64 bg-blueGray-100'
          style={{ backgroundColor: "#C7ECFA" }}
        >
          <ClassroomNavbar />
          <div
            className='relative bg-#C7ECFA-600 md:pt-32 pb-32 pt-12'
            style={{ backgroundColor: "#C7ECFA" }}
          >
            <div className='container mx-auto px-4'>
              <div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 xl:w-12/12 px-4 mb-5 '>
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
                      statPercent={"Team Code: " + teamData.teamCode}
                      statPercentColor='text-emerald-200'
                      statDescription='Members'
                      statIconName='far fa-calendar-minus'
                      statIconColor='bg-emerald-500'
                    />
                    
                  </div>
                  </div>
                  <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 xl:w-12/12 px-4 mb-5 '>
                  <CardAddSubmission
                  statIconName='fas fa-plus'
                  statIconColor='bg-emerald-500'
                  />
                  </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {selection === 1 ? (
          <div className='px-4 mx:auto w-8/12 -m-24'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full xl:w-6/12 mb-12 xl:mb-0 px-4 justify-center'>
                <div className='relative flex flex-col h-full min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700'>
                  <div className='rounded-t mb-0 px-4 py-3 bg-transparent'>
                    <div className='flex flex-wrap justify-center'>
                      <div className='relative w-full max-w-full flex-grow flex-1'>
                        <button
                          className='text-blueGray-100 mb-1 text-xs font-semibold focus:outline-none py-1 rounded'
                          onClick={() => setSelection(2)}
                        >
                          Chat with Teacher
                        </button>
                        <h2 className='text-white text-xl font-semibold'>
                          Chat with Team
                        </h2>
                        <div className='w-full'>
                          <hr className='my-4 md:min-w-full' />
                          <div style={{ height: "20rem" }}>
                            <ReactScrollableFeed>
                              {teamData.teamChat.map(function (msg, ind) {
                                return (
                                  <div className='flex flex-wrap'>
                                    <div className='w-auto lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                                      <CardChat
                                        statSubtitle={msg.author.name}
                                        statTitle={msg.text}
                                        statArrow='up'
                                        statPercent={msg.time}
                                        statPercentColor='text-emerald-200'
                                        statDescription='Members'
                                        statIconName='far fa-calendar-minus'
                                        statIconColor='bg-emerald-500'
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </ReactScrollableFeed>
                          </div>
                          <div className='mt-4'>
                            <input
                              className='w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 outline-none focus:border-emerald-500'
                              placeholder='enter message'
                              value={studentChat.message}
                              onChange={handleStudentChat}
                            />
                            <button
                              className='text-white w-full bg-emerald-500 rounded mt-3 p-2'
                              onClick={(event) => {
                                event.preventDefault();
                                submitStudentChat();
                                setStudentChat({
                                  message: "",
                                });
                              }}
                            >
                              SEND
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className='px-4 mmd:ml-64 w-8/12 -m-24'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full xl:w-6/12 mb-12 xl:mb-0 px-4'>
                  <div className='relative flex flex-col h-full min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700'>
                    <div className='rounded-t mb-0 px-4 py-3 bg-transparent'>
                      <div className='flex flex-wrap items-center'>
                        <div className='relative w-full max-w-full flex-grow flex-1'>
                          <button
                            className='text-blueGray-100 mb-1 text-xs font-semibold focus:outline-none py-1 rounded'
                            onClick={() => setSelection(1)}
                          >
                            Chat with Team
                          </button>
                          <h2 className='text-white text-xl font-semibold'>
                            Chat with Teacher
                          </h2>
                          <div className='w-full'>
                            <hr className='my-4 md:min-w-full' />
                            <div style={{ height: "20rem" }}>
                              <ReactScrollableFeed>
                                {teamData.teacherChat.map(function (msg, ind) {
                                  return (
                                    <div className='flex flex-wrap'>
                                      <div className='w-auto lg:w-11/12 xl:w-11/12 px-4 mb-5 '>
                                        <CardChat
                                          statSubtitle={msg.author.name}
                                          statTitle={msg.text}
                                          statArrow='up'
                                          statPercent={msg.time}
                                          statPercentColor='text-emerald-200'
                                          statDescription='Members'
                                          statIconName='far fa-calendar-minus'
                                          statIconColor='bg-emerald-500'
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </ReactScrollableFeed>
                            </div>
                            <div className='mt-4'>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className='mt-32'>
          <FooterSmall />
        </div>
      </>
    );
  }
  if (type === 1 && !teamData) {
    toshowteam = (
      <>
        <TeamSidebar />
        <div
          className='relative md:ml-64 bg-blueGray-100'
          style={{ backgroundColor: "#C7ECFA" }}
        >
          <ClassroomNavbar />
          <div
            className='relative md:pt-32 pb-32 pt-12'
            style={{ backgroundColor: "#C7ECFA" }}
          >
            <div className='container mx-auto px-4'>
              <div>
                <div className='flex flex-wrap'>
                  <div className='lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center'>
                    <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                      <div className='px-4 py-5 flex-auto'>
                        <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400'>
                          <i className='fas fa-award'></i>
                        </div>
                        <h6 className='text-xl font-semibold'>Create Team</h6>
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
                        <h6 className='text-xl font-semibold'>Join Team</h6>
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
                            onClick={handleJoinTeam}
                          >
                            JOIN
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-32'>
          <FooterSmall />
        </div>
      </>
    );
  }
  if (type === 2 && teamData) {
    toshowteam = (
      <>
        <TeamSidebar />
        <div
          className='relative md:ml-64 bg-blueGray-100'
          style={{ backgroundColor: "#C7ECFA" }}
        >
          <ClassroomNavbar />

          <div
            className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'
            style={{ backgroundColor: "#C7ECFA" }}
          >
            <div className='container mx-auto px-4'>
              <div>
                {teamData.map((currentTeam, index) => (
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
                          statIconColor='bg-emerald-500'
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='-mt-28'>
          <FooterSmall />
        </div>
      </>
    );
  }

  console.log(teamData, "teamdata");
  return <>{toshowteam}</>;
}
