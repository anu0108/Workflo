"use client";
import Image from "next/image";
import Date from "../../public/images/time.svg";

interface CardProps {
  task: {
    _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  order: number;
  };
}

export default function Card({ task  }: CardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-[#FF6B6B]";
      case "low":
        return "bg-[#0ECC5A]";
      case "medium":
        return "bg-[#FFA235]";
      default:
        return "";
    }
  };
  return(
  <div className="p-2 md:p-3 rounded-lg border border-[#DEDEDE] flex flex-col">
    <p className="font-semibold text-[#606060]">
    {task.title}
    </p>
    <p className="text-sm font-normal text-[#797979]">
    {task.description}
    </p>

    <div className={`p-1 ${getPriorityColor(task.priority)} mt-2 text-white text-xs rounded-lg w-14 flex justify-center items-center`}>
    {task.priority}
    </div>

    <div className="mt-2 flex gap-2 items-center">
      <Image src={Date} alt="" width={20} height={20} />
      <p className="font-semibold text-xs text-[#606060]">2024-08-15</p>
    </div>

    <p className="font-normal text-sm text-[#797979] mt-2">1 hr ago</p>
  </div>
  );
}
