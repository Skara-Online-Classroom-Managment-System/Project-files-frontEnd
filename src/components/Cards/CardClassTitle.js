import React from "react";
import PropTypes from "prop-types";
import { blueGray } from "tailwindcss/colors";

export default function CardStats({
  statSubtitle,
  statTitle,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-blueGray-700 rounded mx: 0 xl:mb-0 shadow-lg'>
        <div className='flex-auto p-4 mb-2 '>
          <div className='flex flex-wrap'>
            <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              <span className='font-semibold uppercase text-5xl text-white'>
                {statTitle}
              </span>
            </div>
            <div className='relative w-auto pl-4 flex-initial'>
              <div
                className={
                  "text-bg-blueGray-700 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  "bg-blueGray-100"
                }
              >
                <i class='fa fa-book' aria-hidden='true'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// CardStats.defaultProps = {
//   statSubtitle: "Traffic",
//   statTitle: "350,897",
//   statArrow: "up",
//   statPercent: "3.48",
//   statPercentColor: "text-emerald-500",
//   statDescripiron: "Since last month",
//   statIconName: "far fa-chart-bar",
//   statIconColor: "bg-red-500",
// };

// CardStats.propTypes = {
//   statSubtitle: PropTypes.string,
//   statTitle: PropTypes.string,
//   statArrow: PropTypes.oneOf(["up", "down"]),
//   statPercent: PropTypes.string,
//   // can be any of the text color utilities
//   // from tailwindcss
//   statPercentColor: PropTypes.string,
//   statDescripiron: PropTypes.string,
//   statIconName: PropTypes.string,
//   // can be any of the background color utilities
//   // from tailwindcss
//   statIconColor: PropTypes.string,
// };
