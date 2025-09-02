import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
export default function TableOptions({
  goToOtherTableHandler,
  //@ts-expect-error sss
  handleBoardChange,
}: {
  goToOtherTableHandler: (open: boolean) => void;
  handleBoardChange: (id: string) => void;
}) {
  const [isOpen, setIsopen] = useState(false);
  return (
    <div className="absolute lg:right-1/2 lg:translate-x-[70%] max-sm:top-0 max-lg:right-0">
      <div
        onMouseEnter={() => {
          setIsopen(true);
        }}
        onMouseLeave={() => {
          setIsopen(false);
        }}
        className={`mb-16  bg-[#aaa8a85e] p-2 rounded-md flex flex-col   gap-2 transition-all  left-0
            ${isOpen && "h-[80%]"}`}
      >
        <div className="flex gap-2">
          <p>Table Options</p>
          {isOpen ? (
            <div className="pt-1 flex flex-col">
              <FaChevronDown />
            </div>
          ) : (
            <div className="pt-1">
              <FaChevronUp />
            </div>
          )}
        </div>

        <button
          onClick={() => {
            goToOtherTableHandler(true);
          }}
          className={`${!isOpen && "hidden"} cursor-pointer`}
        >
          Go to other board
        </button>
        <button className={`${!isOpen && "hidden"} self-start cursor-pointer`}>
          Share board
        </button>
      </div>
    </div>
  );
}
