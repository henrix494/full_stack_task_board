export default function TaskCard({
  task,
  status,
  icon,
  onClick,
}: {
  task: string | undefined;
  status: string | undefined;
  icon: string | undefined;
  onClick?: () => void;
}) {
  const statusColors: Record<string, string> = {
    "Task in Progress": "#F5D566", // blue
    "Task Completed": "#A1ECB1", // green
    "Task Wont Do": "#F7D3D3", // red
    default: "#e0dd2061", // gray
  };
  const statusImage: Record<string, string> = {
    "Task in Progress": "/clock-svgrepo-com.svg", // blue
    "Task Completed": "/Done_round.svg", // green
    "Task Wont Do": "/close_ring_duotone.svg", // red
    default: "#e0dd2061", // gray
  };
  // const iconForCard: Record<string, string> = {
  //   pc: "/pc-svgrepo-com.svg",
  //   chat: "/chat-dots-svgrepo-com.svg",
  //   coffee: "/coffee-1-svgrepo-com.svg",
  //   gym: "gym-svgrepo-com.svg",
  //   books: "books-svgrepo-com.svg",
  // };
  const bgColor =
    status && statusColors[status]
      ? statusColors[status]
      : statusColors["default"];
  console.log(status);
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        padding: "0.5rem",
        borderRadius: "0.60rem",
        color: "#fff",
      }}
      className="w-2xl max-lg:max-w-[80vw] h-20 rounded-2xl flex items-center hover:opacity-90 cursor-pointer "
    >
      <div className=" flex items-center justify-between gap-10 w-full">
        <div className="flex items-center gap-10">
          <div
            className={`${
              icon === "/Add_round_duotone.svg" ? "bg-amber-400" : "bg-white"
            }  p-2 rounded-xl`}
          >
            <img width={28} src={icon} alt={"icon"} />
          </div>
          <p className="font-medium text-black text-2xl">{task}</p>
        </div>
        {status !== "add" && (
          <div
            className={`p-3  rounded-md ${
              status === "Task in Progress" && "bg-[#E9A23B]"
            }
            ${status === "Task Completed" && "bg-[#32D757]"} ${
              status === "Task Wont Do" && "bg-[#DD524B]"
            }`}
          >
            {/* //@ts-expect-error ssss */}
            <img
              className={`w-6 `}
              src={statusImage[status || 0]}
              alt="image status"
            />
          </div>
        )}
      </div>
    </div>
  );
}
