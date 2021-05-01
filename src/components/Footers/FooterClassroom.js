import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200  pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden  h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            
          </svg>
        </div>
        <div className="container mx-auto px-4">
         <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12  mx-auto ">
              <div className="text-sm text-blueGray-500 font-semibold text-center py-1">
                Copyright © {new Date().getFullYear()} Skara{" "}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
