import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import BlueBtn from "../styles/buttons/BlueBtn";
import Graybtn from "../styles/buttons/Graybtn";
import { FaRedhat } from "react-icons/fa";

export default function Title({
  title,
  changeNameHandler,
}: {
  title: string | undefined;
  changeNameHandler: (title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string | undefined>(title);

  const editHandler = () => {
    setIsEditing(!isEditing);
    setTextValue(title);
  };
  return (
    <div className="flex items-center gap-6">
      <div className="">
        {isEditing ? (
          <div>
            <input
              className="text-3xl font-bold field-sizing-content border-b-2 focus:outline-none"
              type="text"
              placeholder={title}
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
            />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[-34px] top-1/2 translate-y-[-80%]">
              <FaRedhat color="black" size={23} />
            </div>
            <h1 className="text-3xl font-medium">{title}</h1>
          </div>
        )}
      </div>
      <div className="  flex items-center w-[10px] gap-2">
        <div onClick={editHandler} className="hover:opacity-60 z-10">
          <FaPencilAlt />
        </div>
        {isEditing && (
          <div className="flex lg:gap-6 items-center max-lg:gap-1 max-lg:absolute max-lg:top-5 left-0 ">
            <div
              onClick={() => {
                //@ts-expect-error ssss
                changeNameHandler(textValue);
                setIsEditing(false);
              }}
              className=""
            >
              <BlueBtn>Save</BlueBtn>
            </div>
            <div onClick={() => setIsEditing(false)}>
              <Graybtn>Cancel</Graybtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
