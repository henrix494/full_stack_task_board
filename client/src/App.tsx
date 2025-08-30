import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
interface table {
  id: string;
  name: string;
  description: string;
  tasks: [
    {
      id: number;
      title: string;
      type: string;
      description: string;
      boardId: string;
    }
  ];
}
function App() {
  const [id, setId] = useState<string>("");
  const [tableData, setTableData] = useState<table>();
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
  };
  useEffect(() => {
    handleRed();
    getBoardDetails();
  }, [id]);
  if (isBoard && window.location.pathname !== `/${isBoard}`) reDirect();
  return (
    <main className="flex justify-center flex-col  items-center pt-20">
      <div>
        <h1>{tableData?.name}</h1>
        <h3>{tableData?.description}</h3>
      </div>
      <div>
        <ul className="list-none w-full">
          {tableData?.tasks.map((item) => (
            <li className="list-none">{item.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
