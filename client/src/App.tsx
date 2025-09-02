import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import Title from "../components/Title";
import TaskCard from "../components/TaskCard";
import TaskEdit from "../components/TaskEdit";
import type { Task, table } from "../types/index";
import TableOptions from "../components/TableOptions";
import GootherModel from "../components/GootherModel";
function App() {
  // State of the app
  const [id, setId] = useState<string>("");
  const [tableData, setTableData] = useState<table>();
  const [load, setLoad] = useState(true);
  const [openDraw, setOpenDraw] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  //end states of the app
  const start = async () => {
    const data = await fetch(`${baseUrl}/api/boards`);
    const final = await data.json();
    if (data.status === 200) {
      localStorage.setItem("board", final.boardId);
      setId(final.boardId);
    }
  };
  const isBoard = localStorage.getItem("board");
  const reDirect = () => {
    if (isBoard) window.location.href = isBoard;
  };
  const handleRed = async () => {
    if (!isBoard) {
      await start();
      if (id && window.location.pathname !== `/${isBoard}`) reDirect();
    }
  };
  const getBoardDetails = async () => {
    const data = await fetch(
      `${baseUrl}/api/boards${window.location.pathname}`
    );
    const final = await data.json();
    setTableData(final);
    setLoad(false);
  };

  if (isBoard && window.location.pathname !== `/${isBoard}`) reDirect();
  const changeNameHandler = async (title: string) => {
    setTableData({
      description: tableData?.description,
      id: tableData?.id,
      name: title,
      tasks: tableData?.tasks,
    });
    const data = await fetch(
      `${baseUrl}/api/boards${window.location.pathname}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      }
    );
    const final = await data.json();
    console.log(final);
  };
  const drawerhandler = (props = !openDraw) => {
    setOpenDraw(props);
  };
  const addTaskHandler = async () => {
    const data = await fetch(
      baseUrl + "/api/tasks" + window.location.pathname,
      {
        method: "POST",
      }
    );
    const final = await data.json();
    const newItem: Task = {
      icon: "/clock-svgrepo-com.svg",
      description: "Task in Progress",
      title: "Task in Progress",
      type: "Task in Progress",
      boardId: window.location.pathname.slice(1),

      id: final.id,
    };
    setTableData((prev) =>
      prev
        ? {
            ...prev,
            tasks: prev.tasks ? [...prev.tasks, newItem] : [newItem],
          }
        : prev
    );
  };
  // handleDelete
  const handleDelete = async (id: number | undefined) => {
    const filter = tableData?.tasks?.filter((item) => item?.id !== id);
    setTableData({
      id: tableData?.id,
      description: tableData?.description,
      name: tableData?.name,
      tasks: filter,
    });
    const data = await fetch(`${baseUrl}/api/tasks/${id}`, {
      method: "DELETE",
    });
    const final = await data.json();
    console.log(final);
  };
  //end of handle delete
  const saveHandler = async (task: Task | undefined) => {
    setTableData({
      description: tableData?.description,
      id: tableData?.id,
      name: tableData?.name,
      tasks: tableData?.tasks?.map((item) => {
        if (item?.id === task?.id) return task;
        return item;
      }),
    });
    //@ts-expect-error ssss
    const send = await fetch(`${baseUrl}/api/tasks/${task?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };
  const [isModelChangeTable, setIsModelChangeTable] = useState(false);
  const goToOtherTableHandler = (open: boolean) => {
    setIsModelChangeTable(open);
  };
  const handleBoardChange = (id: string) => {
    window.location.assign(`${window.location.host}/${id}`);
    console.log(id);
  };
  useEffect(() => {
    handleRed();
    getBoardDetails();
  }, [id]);
  return (
    <main className=" flex justify-center pt-20 ">
      {load ? (
        <div>Load....</div>
      ) : (
        <div className="flex flex-col items-start">
          <TableOptions
            goToOtherTableHandler={goToOtherTableHandler}
            handleBoardChange={handleBoardChange}
          />
          <div className="mb-10">
            <Title
              title={tableData?.name}
              changeNameHandler={changeNameHandler}
            />
            <h3 className="mt-4">{tableData?.description}</h3>
          </div>
          <div className="">
            <div className="flex flex-col gap-6 ">
              {tableData?.tasks?.map((item) => (
                <TaskCard
                  task={item?.title}
                  status={item?.type}
                  icon={item?.icon}
                  onClick={() => {
                    drawerhandler();
                    setCurrentTask(item);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-7">
            <TaskCard
              icon="/Add_round_duotone.svg"
              task="Add new task"
              status="add"
              onClick={addTaskHandler}
            />
          </div>
        </div>
      )}

      <TaskEdit
        isOpen={openDraw}
        drawerhandler={drawerhandler}
        task={currentTask}
        handleDelete={handleDelete}
        saveHandler={saveHandler}
      />
      <GootherModel
        isOpen={isModelChangeTable}
        goToOtherTableHandler={goToOtherTableHandler}
        handleBoardChange={handleBoardChange}
      />
    </main>
  );
}

export default App;
