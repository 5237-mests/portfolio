import React from "react";

const Alert = ({ type, text }) => {
  return (
    <div className="absolute top-0 right-0 left-0 flex justify-center items-center">
      <div
        className={`${
          type === "success" ? "bg-green-800" : "bg-red-800"
        }  p-2 text-indigo-100 leading-none flex lg:inline-flex items-center`}
        role="alert"
      >
        <p
          className={`${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } flex rounded-full uppercase px-2 py-1 font-semibold text-xs mr-3 text-white`}
        >
          {type === "success" ? "Success" : "Failed"}
        </p>
        <p className="mr-2 text-left">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
