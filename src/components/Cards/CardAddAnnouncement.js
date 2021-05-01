import React from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

export default function CardStats({ statIconName, statIconColor }) {
  const [announcement, setAnnouncement] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  function handleChange(event) {
    const val = event.target.value;
    setAnnouncement(val);
  }
  const { pos } = useParams();
  function handleSubmit(event) {
    event.preventDefault();
    console.log("plus was clicked");
    axios({
      method: "POST",
      data: {
        announcement: announcement,
      },
      withCredentials: true,
      url: "http://localhost:5000/createAnnouncement/" + pos,
    }).then((res) => {
      setRedirect(true);
    });
  }
  if (redirect) {
    window.location.reload();
  }
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
        <div className='flex-auto p-4'>
          <div className='flex flex-wrap'>
            <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              <span className='font-semibold text-xl text-blueGray-700'>
                {"Add Announcement"}
              </span>
              <div class='flex items-center mt-3 mb-3'>
                <form class='w-full' onSubmit={handleSubmit}>
                  <input
                    type='text'
                    placeholder='Add Announcement'
                    class='w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 outline-none focus:border-emerald-500'
                    name='newAnnouncement'
                    value={announcement}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>

            <div className='relative w-auto pl-4 flex-initial mt-8'>
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i onClick={handleSubmit} className={statIconName}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

