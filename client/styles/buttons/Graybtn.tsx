import { IoTrashBin } from "react-icons/io5";

export default function Graybtn({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white bg-gray-400 w-[120px] py-1 rounded-2xl flex items-center  justify-center gap-2 cursor-pointer">
      <div> {children}</div>
      <IoTrashBin />
    </div>
  );
}
