import { createPortal } from "react-dom";
import { useState } from "react";
export default function GootherModel({
  isOpen,
  goToOtherTableHandler,
  handleBoardChange,
}: {
  isOpen: boolean;
  goToOtherTableHandler: (open: boolean) => void;
  handleBoardChange: (id: string) => void;
}) {
  const [id, setId] = useState<string>("");
  const model = () => {
    return (
      <div
        className={`fixed top-1/2 left-1/2 translate-[-50%] rounded-md  w-[300px] h-[200px] bg-white flex flex-col items-center justify-center z-2 transition-all ${
          isOpen ? "opacity-100" : "opacity-0 z-[-1]"
        }`}
      >
        <label htmlFor="id">Id</label>
        <input
          className="outline-none border-1 border-[#80808059] rounded-md px-5"
          type="text"
          id="id"
          name="id"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="cursor-pointer"
          onClick={() => handleBoardChange(id)}
        >
          Go
        </button>
      </div>
    );
  };
  const Layer = () => {
    return (
      <div
        onClick={() => goToOtherTableHandler(false)}
        className={` fixed w-screen h-screen transition duration-300 ease-in-out z-1 ${
          isOpen ? "bg-[#80808085]" : "white  z-[-1]"
        } top-0`}
      ></div>
    );
  };
  return (
    <div>
      {createPortal(model(), document.body)}
      {createPortal(Layer(), document.body)}
    </div>
  );
}
