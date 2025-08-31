import { createPortal } from "react-dom";
import type { Task } from "../types";
import { icontPath } from "../constants/index";
import BlueBtn from "../styles/buttons/BlueBtn";
import Graybtn from "../styles/buttons/Graybtn";

export default function TaskEdit({
  isOpen,
  drawerhandler,
  task,
}: {
  isOpen: boolean;
  drawerhandler: () => void;
  task: Task | undefined;
}) {
  const body = document.querySelector("body");
  if (body) {
    body.style.overflowX = "hidden";
  }
  const model = () => {
    const inputStyle =
      "w-[100%] h-[30px] rounded-md px-2 outline-none border-1 border-[#00000055] focus:border-blue-500";
    return (
      <div
        className={`fixed top-1/2 h-[95vh]  translate-y-[-50%]  right-2 rounded-2xl bg-white  w-[45%]  overflow-hidden  transition duration-300 ease-in-out ${
          isOpen ? "translate-x-[-0%]" : "translate-x-[150%]"
        }`}
      >
        <div className="flex flex-col relative h-full">
          <div className=" p-4 ">
            <div className="mb-6 ">
              <p>Task details</p>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div>
                <label className="opacity-40" htmlFor="Task details">
                  Task Name
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  name="Task details"
                  id="Task details"
                  placeholder={task?.title}
                />
              </div>
              <div className="">
                <label className="opacity-40" htmlFor="Task Description">
                  Description
                </label>

                <textarea
                  className={inputStyle + " h-[100px]"}
                  placeholder={task?.description}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {icontPath.map((item) => {
                  return (
                    <div
                      className={`bg-[#80808046] rounded-md p-2 cursor-pointer ${
                        item === task?.icon && "bg-yellow-300"
                      }`}
                    >
                      <img src={item} className={`w-6 `} alt="desc item" />
                    </div>
                  );
                })}
              </div>
              <div>
                <p>Status</p>
              </div>
            </div>
          </div>
          <div className="  absolute bottom-10 right-0 w-full">
            <div className="flex justify-center gap-10">
              <Graybtn> Delete</Graybtn>
              <BlueBtn>Save</BlueBtn>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const Layer = () => {
    return (
      <div
        //@ts-expect-error ssss
        onClick={() => drawerhandler(false)}
        className={` fixed w-screen h-screen transition duration-300 ease-in-out  ${
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
