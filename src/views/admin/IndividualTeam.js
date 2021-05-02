import React from "react";
import axios from "axios";
import ReactScrollableFeed from "react-scrollable-feed";
import { useParams } from "react-router-dom";

import ClassroomNavbar from "components/Navbars/TeacherClassroomNavbar.js";
import TeacherSidebar from "components/Sidebar/TeacherSidebar.js";
import CardStats from "components/Cards/CardStats.js";
import CardChat from "components/Cards/CardChat.js";
import ScrollableFeed from "react-scrollable-feed";

export default function Team(props) {
  const [teamData, setTeamData] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [teacherChat, setTeacherChat] = React.useState({
    message: "",
  });
  const { pos, teampos } = useParams();
  const [teacherChatData, setTeacherChatData] = React.useState({});
  console.log("teampos", teampos);
  React.useEffect(() => {
    axios({
      method: "GET",
      params: {
        pos: pos,
        teampos: teampos,
      },
      withCredentials: true,
      url: "http://localhost:5000/teamselected",
    }).then((res) => {
      console.log(res.data.teamDetails);
      setTeamData(res.data.teamDetails);
    });
  }, [pos, teampos,teacherChatData]);

  console.log(teamData, "teamsdata");
  
  function handleTeacherChat(event) {
    event.preventDefault();
    setTeacherChat({
      message: event.target.value,
    });
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
  console.log(teacherChatData, "teacherchatdata");

  let toshowteamcard = null;
  if (teamData) {
    toshowteamcard = (
      <CardStats
        statSubtitle={teamData.members.reduce(function (total, currentMember) {
          return total + currentMember.firstName + " " ;
        }, "")}
        statTitle={teamData.teamName}
        statArrow='up'
        statPercent={teamData.members.length}
        statPercentColor='text-emerald-200'
        statDescription='Members'
        statIconName='far fa-calendar-minus'
        statIconColor='bg-emerald-500'
      />
    );
  }
  let toshowchat = null;
  if (teamData) {
    toshowchat = (
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
    );
  }
  return (
    <>
      <TeacherSidebar />
      <div className='relative md:ml-64 bg-blueGray-100'  style = {{backgroundColor : '#C7ECFA'}}>
        <ClassroomNavbar />

        <div className='relative md:pt-32 pb-32 pt-12' style = {{backgroundColor : '#C7ECFA'}}>
          <div className='container mx-auto px-4'>
            <div>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-11/12 xl:w-12/12 px-4 mb-5 '>
                  {toshowteamcard}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='px-4 mmd:ml-64 w-8/12 -m-24'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
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
                        {toshowchat}
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
      </div>
    </>
  );
}
