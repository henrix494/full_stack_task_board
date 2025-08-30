import React from "react";
import { BiCheckDouble } from "react-icons/bi";

export default function BlueBtn({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white bg-blue-600 w-[120px] py-1 rounded-2xl flex items-center  justify-center gap-2 cursor-pointer">
      <button>{children}</button>
      <BiCheckDouble width={40} scale={1000} size={25} height={40} />
    </div>
  );
}
