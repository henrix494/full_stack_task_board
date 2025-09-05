import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
export default function TableOptions({
  goToOtherTableHandler,
}: {
  goToOtherTableHandler: (open: boolean) => void;
  handleBoardChange: (id: string) => void;
}) {
  const [isOpen, setIsopen] = useState(false);
  const handleCopy = async () => {
    const path = window.location.pathname.slice(1);
    try {
      window.navigator.clipboard.writeText(path);
      alert("id is copied");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute lg:left-1/2 lg:translate-x-[150%] max-sm:top-0 max-lg:right-0 ">
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
        <button
          onClick={handleCopy}
          className={`${!isOpen && "hidden"} self-start cursor-pointer`}
        >
          Share board
        </button>
      </div>
    </div>
  );
}

//cedc890b-9722-4001-bb27-748a326ac3e5
//039be080-7f36-471e-9dce-d649a39844fb
