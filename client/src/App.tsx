import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import Title from "../components/Title";
import TaskCard from "../components/TaskCard";
import TaskEdit from "../components/TaskEdit";
interface Task {
  id: number | undefined;
  title: string | undefined;
  type: string | undefined;
  description: string | undefined;
  boardId: string | undefined;
  icon: string | undefined;
}

interface table {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  tasks: (Task | undefined)[] | undefined;
}
function App() {
  // State of the app
  const [id, setId] = useState<string>("");
  const [tableData, setTableData] = useState<table>();
  const [load, setLoad] = useState(true);
  const [openDraw, setOpenDraw] = useState(false);
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
  useEffect(() => {
    handleRed();
    getBoardDetails();
  }, [id]);
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
  return (
    <main className=" flex justify-center pt-20 ">
      {load ? (
        <div>Load....</div>
      ) : (
        <div className="flex flex-col items-start">
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
                />
              ))}
            </div>
          </div>
          <div className="mt-7">
            <TaskCard
              icon="/Add_round_duotone.svg"
              task="Add new task"
              status="add"
              onClick={drawerhandler}
            />
          </div>
        </div>
      )}

      <TaskEdit isOpen={openDraw} drawerhandler={drawerhandler} />
    </main>
  );
}

export default App;
