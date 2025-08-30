import React from "react";

export default function TaskCard({
  task,
  status,
}: {
  task: string | undefined;
  status: string | undefined;
}) {
  const statusColors: Record<string, string> = {
    "Task in Progress": "#3b82f6", // blue
    "Task Completed": "#22c55e", // green
    "Task Wont Do": "#ef4444", // red
    default: "#9ca3af", // gray
  };

  const bgColor =
    status && statusColors[status]
      ? statusColors[status]
      : statusColors["default"];

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "0.5rem",
        borderRadius: "0.25rem",
        color: "#fff",
      }}
      className="w-2xl h-20 rounded-2xl"
    >
      <p>{task}</p>
    </div>
  );
}
