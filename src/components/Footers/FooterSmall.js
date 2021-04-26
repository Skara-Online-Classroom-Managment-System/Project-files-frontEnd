import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 mx-auto text-center md:text-center">
                Copyright © {new Date().getFullYear()}{" "}Skara
              </div>
            </div>
            
          </div>
        </div>
      </footer>
    </>
  );
}
