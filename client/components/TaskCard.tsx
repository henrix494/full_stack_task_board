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
    "Task in Progress": "#3b83f694", // blue
    "Task Completed": "#22c55e8f", // green
    "Task Wont Do": "#ef44446c", // red
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

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        padding: "0.5rem",
        borderRadius: "0.60rem",
        color: "#fff",
      }}
      className="w-2xl h-20 rounded-2xl flex items-center hover:opacity-90 cursor-pointer "
    >
      <div className=" flex items-center justify-center gap-10">
        <div
          className={`${
            icon === "/Add_round_duotone.svg" ? "bg-amber-400" : "bg-white"
          }  p-2 rounded-xl`}
        >
          <img width={28} src={icon} alt={"icon"} />
        </div>
        <p className="font-medium text-black text-2xl">{task}</p>
      </div>
    </div>
  );
}
