"use client";
import { Barlow, Inter } from "next/font/google";
import Image from "next/image";
import Add from "../../../public/images/add.svg";
import Question from "../../../public/images/question.svg";
import Tags from "../../../public/images/undraw_opinion_re_jix4 1.svg";
import Link from "../../../public/images/link.svg";
import Access from "../../../public/images/access.svg";
import Search from "../../../public/images/search.svg";
import Calendar from "../../../public/images/calendar.svg";
import Automation from "../../../public/images/automation.svg";
import Filter from "../../../public/images/filter.svg";
import Share from "../../../public/images/share.svg";
import Task from "../../../public/images/task.svg";
import addNew from "../../../public/images/add-new.svg";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { ClipLoader } from "react-spinners";

import Card from "@/components/Card";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/TaskModal";
import { useRouter } from 'next/navigation';
const barlow = Barlow({ subsets: ["latin"], weight: "600" });
const inter = Inter({ subsets: ["latin"], weight: "400" });

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  order: number;
}

interface Column {
  id: string;
  title: string;
}

const initialColumns: Column[] = [
  { id: "to-do", title: "To do" },
  { id: "in-progress", title: "In Progress" },
  { id: "under-review", title: "Under Review" },
  { id: "finished", title: "Finished" },
];



export default function Dashboard() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [orderChanged, setOrderChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskPopup, setTaskPopup] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PORT}/card`
      );
      setTasks(response.data);
      setLoading(false);
    };

    fetchCards();
  }, [orderChanged]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    // const updatedTasks = Array.from(tasks);

    const updatedTasks = [...tasks];

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const columnTasks = updatedTasks.filter(
        (task) =>
          task.status.toLowerCase().replace(" ", "-") === source.droppableId
      );
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);

      console.log(source);
      console.log(destination);
      console.log(movedTask);

      const reorderedTasks = columnTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      await axios.post(`${process.env.NEXT_PUBLIC_API_PORT}/card/reorder`, {
        source,
        destination,
        movedTask,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const reorderedTask = reorderedTasks.find((t) => t._id === task._id);
          return reorderedTask ? reorderedTask : task;
        })
      );
    } else {
      // Moving between columns
      const sourceTasks = updatedTasks.filter(
        (task) =>
          task.status.toLowerCase().replace(" ", "-") === source.droppableId
      );
      const destinationTasks = updatedTasks.filter(
        (task) =>
          task.status.toLowerCase().replace(" ", "-") ===
          destination.droppableId
      );

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId;
      destinationTasks.splice(destination.index, 0, movedTask);

      const reorderedSourceTasks = sourceTasks.map((task, index) => ({
        ...task,
        order: index,
      }));
      const reorderedDestinationTasks = destinationTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      console.log("Reordered tasks in source column:", reorderedSourceTasks);
      console.log(
        "Reordered tasks in destination column:",
        reorderedDestinationTasks
      );

      await axios.post(`${process.env.NEXT_PUBLIC_API_PORT}/card/reorder`, {
        source,
        destination,
        movedTask,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const reorderedTask =
            reorderedSourceTasks.find((t) => t._id === task._id) ||
            reorderedDestinationTasks.find((t) => t._id === task._id);
          return reorderedTask ? reorderedTask : task;
        })
      );
    }
    setOrderChanged(!orderChanged);
  };

  return (
    <div className="flex h-screen">
      <Sidebar setTaskPopup={setTaskPopup} />
      <div className="bg-[#F7F7F7] w-full p-4">
        <div className="flex justify-between">
          <p
            className={`text-[#080808] font-semibold text-4xl ${barlow.className}`}
          >
            Good morning, Joe!
          </p>
          <div className="flex items-center gap-2 cursor-pointer">
            {" "}
            <p className={`text-[#080808]`}>Help & Feedback</p>{" "}
            <Image src={Question} alt=""  />
          </div>
        </div>

        <div className="flex gap-2 xl:gap-3 mt-4">
          <div className="bg-[#FFFFFF] flex gap-2 items-center p-2 xl:p-4 rounded">
            <Image src={Tags} alt="" className="w-12 h-16 xl:w-16"/>
            <div>
              <p className="text-[#757575] font-semibold">Introducing Tags</p>
              <p className="text-[#868686] text-xs">
                Easily categorize and find your notes by adding tags. Keep your
                workspace clutter-free and efficient.
              </p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] flex gap-2 items-center p-2 xl:p-4 rounded">
            <Image src={Link} alt="" className="w-12 h-16 xl:w-16" />
            <div>
              <p className="text-[#757575] font-semibold">
                Share Notes Instantly
              </p>
              <p className="text-[#868686] text-xs">
                Effortlessly share your notes with others via email or link.
                Enhance collaboration with quick sharing options.
              </p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] flex gap-2 items-center p-2 xl:p-4 rounded">
            <Image src={Access} alt="" className="w-12 h-16 xl:w-16" />
            <div>
              <p className="text-[#757575] font-semibold">Access Anywhere</p>
              <p className="text-[#868686] text-xs">
                Sync your notes across all devices. Stay productive whether
                you&apos;re on your phone, tablet, or computer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#FFFFFF] border border-[#E9E9E9] p-2 rounded-lg flex justify-between focus:border-[#999999] text-sm xl:text-base outline-none w-36 xl:w-40"
            />
            <Image src={Search} className="absolute top-2 left-28 xl:left-32 w-4 h-4 mt-0.5 xl:mt-0 xl:w-6 xl:h-6" alt="" />
          </div>

          <div className="flex gap-2 xl:gap-4 pt-0.5">
            <div className="bg-[#F4F4F4] p-2 rounded flex gap-2 cursor-pointer h-9 xl:h-full border border-[#E9E9E9]">
              <p className="text-[#797979] text-sm xl:text-base">Calendar view</p>
              <Image src={Calendar} alt="" className="w-4 h-4 mt-0.5 xl:mt-0 xl:w-6 xl:h-6" />
            </div>
            <div className="bg-[#F4F4F4] p-2 rounded flex gap-2 cursor-pointer h-9 xl:h-full border border-[#E9E9E9]">
              <p className="text-[#797979] text-sm xl:text-base">Automation</p>
              <Image src={Automation} alt="" className="w-4 h-4 mt-0.5 xl:mt-0 xl:w-6 xl:h-6"  />
            </div>
            <div className="bg-[#F4F4F4] p-2 rounded flex gap-2 cursor-pointer h-9 xl:h-full border border-[#E9E9E9]">
              <p className="text-[#797979] text-sm xl:text-base">Filter</p>
              <Image src={Filter} alt="" className="w-4 h-4 mt-0.5 xl:mt-0 xl:w-6 xl:h-6" />
            </div>
            <div className="bg-[#F4F4F4] p-2 rounded flex gap-2 cursor-pointer h-9 xl:h-full border border-[#E9E9E9]">
              <p className="text-[#797979] text-sm xl:text-base">Share</p>
              <Image src={Share} alt="" className="w-4 h-4 mt-0.5 xl:mt-0 xl:w-6 xl:h-6"  />
            </div>

            <div className=" rounded flex gap-2 cursor-pointer  bg-gradient-to-b from-[#4C38C2] to-[#2F2188] p-2 h-9 xl:h-full">
              <p className="text-[#FFFFFF] hidden lg:block lg:text-sm xl:text-base">Create New</p>
              <Image src={Add} alt="" className="w-4 h-4 mt-0.5 xl:mt-0 xl:w-6 xl:h-6" />
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-4 bg-[#FFFFFF] p-4 rounded-lg w-full flex gap-4 justify-between">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px] w-full">
                <ClipLoader color={"#4C38C2"} loading={loading} size={50} />
              </div>
            ) : (
              columns.map((column) => (
                <div key={column.id} className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between w-full">
                    <p className="text-[#252525] font-semibold">
                      {column.title}
                    </p>
                    <Image src={Task} alt="" width={24} height={24} />
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mt-4 space-y-4"
                      >
                        {tasks
                          .filter(
                            (task) =>
                              task.status.toLowerCase().replace(" ", "-") ===
                              column.id
                          )
                          .sort((a, b) => a.order - b.order)
                          .map((task, index) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card task={task} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <div
                    className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] p-2 rounded-lg flex justify-between cursor-pointer"
                    onClick={() => setTaskPopup(true)}
                  >
                    <p className="text-[#E3E1E1]">Add New</p>
                    <Image src={addNew} alt="" />
                  </div>
                </div>
              ))
            )}
          </div>
        </DragDropContext>
      </div>

      {taskPopup && <TaskModal onClose={() => setTaskPopup(false)} />}
    </div>
  );
}
