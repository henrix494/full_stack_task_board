import React from "react";
import { createPortal } from "react-dom";

export default function TaskEdit({
  isOpen,
  drawerhandler,
}: {
  isOpen: boolean;
  drawerhandler: () => void;
}) {
  const body = document.querySelector("body");
  if (body) {
    body.style.overflowX = "hidden";
  }
  const model = () => {
    return (
      <div
        className={`absolute top-1/2 h-[95vh] translate-y-[-50%]  right-2 rounded-2xl bg-white  w-[45%]  overflow-hidden  transition duration-300 ease-in-out ${
          isOpen ? "translate-x-[-0%]" : "translate-x-[150%]"
        }`}
      >
        <p></p>
      </div>
    );
  };
  const Layer = () => {
    return (
      <div
        //@ts-expect-error ssss
        onClick={() => drawerhandler(false)}
        className={` absolute w-screen h-screen transition duration-300 ease-in-out  ${
          isOpen ? "bg-[#80808085]" : "white  z-[-1]"
        } top-0`}
      ></div>
    );
  };

  return (
    <div className="">
      {createPortal(Layer(), document.body)}
      {createPortal(model(), document.body)}
    </div>
  );
}
