import React from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import axios from "axios";

const CardStats = ({
  announcementPos,
  statSubtitle,
  statTitle,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) => {
  const [redirect, setRedirect] = React.useState(false);
  const { pos } = useParams();
  function handleClick() {
    console.log("handle click of delete announcement ");
    axios({
      method: "GET",
      withCredentials: true,
      params: {
        pos: pos,
        announcementPos: announcementPos,
      },
      url: "http://localhost:5000/deleteannouncement",
    }).then((res) => {
      console.log("announcement deleted");
      setRedirect(true);
    });
  }
  if (redirect) {
    window.location.reload();
  }
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-10 xl:mb-0 shadow-lg'>
        <div className='flex-auto p-4 '>
          <div className='flex flex-wrap'>
            <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              
              <span className='font-semibold text-xl text-blueGray-700'>
                {statTitle}
              </span>
              <h5 className='text-sm text-blueGray-400 mt-4'>
                {statSubtitle}
              </h5>
            </div>
            <div className='relative w-auto pl-4 flex-initial'>
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <Link onClick={handleClick} to={"/classroom/" + pos}>
                  <i className={statIconName}></i>
                </Link>
              </div>
            </div>
          </div>
          <p className='text-sm text-blueGray-400 mt-4'>
            <span className={statPercentColor + " mr-2"}>
              <strong>{statPercent} </strong>
            </span>
            <span className='whitespace-nowrap'>{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default withRouter(CardStats);
