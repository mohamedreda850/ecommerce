import React from "react";
import image from "./../../assets/images/error.svg"
const Notfound = () => {
  return (
    <div className="p-[80px] ">
      <div className="w-[70%] mx-auto">
        <img src={image} alt="" className="w-full"/>
      </div>
    </div>
  );
};

export default Notfound;
