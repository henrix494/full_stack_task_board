import { createPortal } from "react-dom";
import type { Task } from "../types";
import { icontPath } from "../constants/index";
import BlueBtn from "../styles/buttons/BlueBtn";
import Graybtn from "../styles/buttons/Graybtn";
import { useEffect, useState } from "react";
import { taskStatus } from "../constants/index";
import Check from "../styles/Check";
import { RiCloseCircleFill } from "react-icons/ri";

export default function TaskEdit({
  isOpen,
  drawerhandler,
  task,
  handleDelete,
  saveHandler,
}: {
  isOpen: boolean;
  drawerhandler: () => void;
  task: Task | undefined;
  handleDelete: (id: number | undefined) => void;
  saveHandler: (task: Task | undefined) => void;
}) {
  const body = document.querySelector("body");
  if (body) {
    body.style.overflowX = "hidden";
  }
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  useEffect(() => {
    if (task) {
      setCurrentTask(task);
    }
  }, [task]);
  const changeIconhandler = (src: string) => {
    setCurrentTask((prev) => (prev ? { ...prev, icon: src } : prev));
  };
  const changeStatusHandler = (status: string) => {
    setCurrentTask((prev) => (prev ? { ...prev, type: status } : prev));
  };

  const model = () => {
    const inputStyle =
      "w-[100%] h-[30px] rounded-md px-2 outline-none border-1 border-[#00000055] focus:border-blue-500";
    return (
      <div
        className={`fixed top-1/2 h-[95vh]  translate-y-[-50%]  lg:right-2 lg:rounded-2xl bg-white  w-[45%]  overflow-hidden  transition duration-300 ease-in-out ${
          isOpen ? "translate-x-[-0%]" : "translate-x-[150%]"
        } max-lg:w-[100dvw] max-lg:h-[100dvh] z-20`}
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
                  onChange={(e) =>
                    setCurrentTask((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                  value={currentTask?.title}
                />
              </div>
              <div className="">
                <label className="opacity-40" htmlFor="Task Description">
                  Description
                </label>

                <textarea
                  name="ask Description"
                  id="ask Description"
                  className={inputStyle + " h-[100px]"}
                  placeholder={task?.description}
                  onChange={(e) => {
                    setCurrentTask((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    );
                  }}
                  value={currentTask?.description}
                />
              </div>
              <div className="flex flex-col gap-4">
                <p>icons</p>
                <div className="flex flex-wrap gap-4 ">
                  {icontPath.map((item) => {
                    return (
                      <div
                        className={`bg-[#80808046] rounded-md p-2 cursor-pointer ${
                          item === currentTask?.icon && "bg-yellow-300"
                        }`}
                        onClick={() => changeIconhandler(item)}
                      >
                        <img src={item} className={`w-6 `} alt="desc item" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div>
                  <p>Status</p>
                </div>
                <div className=" flex flex-wrap gap-2 max-lg:flex-col">
                  {taskStatus.map((item) => (
                    <div
                      className={`lg:w-[45%] flex gap-8 h-[50px] border-1 border-[rgba(0,0,0,0.33)] rounded-md p-1 relative items-center  ${
                        currentTask?.type === item.status
                          ? "border-blue-800"
                          : "border-[rgba(0,0,0,0.33)]"
                      }`}
                      onClick={() => changeStatusHandler(item.status)}
                    >
                      <div
                        style={{
                          backgroundColor: item.color,
                        }}
                        className="h-full w-[50px] rounded-md flex  justify-center"
                      >
                        <img
                          src={item.icon}
                          className="w-7"
                          alt={item.status + "icon"}
                        />
                      </div>
                      <div>
                        <p>{item.name}</p>
                      </div>
                      <div
                        className={`  right-10 ${
                          currentTask?.type === item.status
                            ? "absolute"
                            : "hidden"
                        }`}
                      >
                        <Check />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="  absolute lg:bottom-10 bottom-1 right-0 w-full">
            <div className="flex justify-center gap-10">
              <Graybtn
                onClick={() => {
                  handleDelete(task?.id);
                  drawerhandler();
                }}
              >
                Delete
              </Graybtn>
              <BlueBtn
                onClick={() => {
                  saveHandler(currentTask);
                  drawerhandler();
                }}
              >
                <p className="cursor-pointer z-10 ">Save</p>{" "}
              </BlueBtn>
            </div>
          </div>
          <div
            onClick={() => drawerhandler()}
            className="absolute right-10 top-4"
          >
            <RiCloseCircleFill size={25} />
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
