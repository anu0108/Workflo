import Image from "next/image";
import DP from "../../public/images/dp.webp";
import Bell from "../../public/images/bell.svg";
import Sun from "../../public/images/sun.svg";
import Arrow from "../../public/images/chevron.svg";
import Home from "../../public/images/home.svg";
import Boards from "../../public/images/boards.svg";
import Settings from "../../public/images/settings.svg";
import Teams from "../../public/images/teams.svg";
import Analytics from "../../public/images/analytics.svg";
import Add from "../../public/images/add.svg";
import Download from "../../public/images/download.svg";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

export default function Sidebar({setTaskPopup}:any) {
  const [selected, setSelected] = useState("home");
  const handleSelect = (item: any) => {
    setSelected(item);
  };
  const router = useRouter();

  const handleLogout = async() => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_PORT}/logout`, {},
      { withCredentials: true }
    );
    toast.success("User Logged out")
    router.push("/")
  }

  const handlePopupOpen = () => {
    setTaskPopup(true);
  }

  return (
    <div className="hidden w-28 lg:w-72 xl:w-80 bg-[#FFFFFF] p-4 md:flex flex-col justify-between">
      <div>
        <div className="flex flex-col lg:flex-row items-center font-medium gap-3 ">
          <Image src={DP} alt="" width={40} height={40} />
          <p className="text-[#080808] text-sm lg:text-lg text-center lg:text-left w-16 lg:w-full">Joe Gardner</p>
        </div>
        <div className="flex items-center mt-4 gap-4 lg:justify-between">
          <div className="flex gap-4">
            <Image
              src={Bell}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer hidden lg:block"
            />
            <Image
              src={Sun}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer hidden lg:block"
            />
            <Image
              src={Arrow}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer hidden lg:block"
            />
          </div>
          <button className="p-2 bg-[#F4F4F4] text-base hidden lg:block text-[#797979] rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:gap-0 items-center">
          <div
            onClick={() => handleSelect("home")}
            className={`flex flex-col lg:flex-row items-center lg:gap-5 p-0.5 lg:p-2 cursor-pointer w-16 lg:w-full ${
              selected === "home"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Home} alt="Home" className="w-5 h-5 lg:w-6 lg:h-6" />
            <p className="text-[#797979] text-sm lg:text-base">Home</p>
          </div>
          <div
            onClick={() => handleSelect("boards")}
            className={`flex flex-col lg:flex-row items-center lg:gap-5 p-0.5 lg:p-2 cursor-pointer w-16 lg:w-full ${
              selected === "boards"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Boards} alt="Boards" className="w-5 h-5 lg:w-6 lg:h-6" />
            <p className="text-[#797979] text-sm lg:text-base">Boards</p>
          </div>
          <div
            onClick={() => handleSelect("settings")}
            className={`flex flex-col lg:flex-row items-center lg:gap-5 p-0.5 lg:p-2 cursor-pointer w-16 lg:w-full ${
              selected === "settings"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Settings} alt="Settings" className="w-5 h-5 lg:w-6 lg:h-6" />
            <p className="text-[#797979] text-sm lg:text-base">Settings</p>
          </div>
          <div
            onClick={() => handleSelect("teams")}
            className={`flex flex-col lg:flex-row items-center lg:gap-5 p-0.5 lg:p-2 cursor-pointer w-16 lg:w-full ${
              selected === "teams"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Teams} alt="Teams" className="w-5 h-5 lg:w-6 lg:h-6"/>
            <p className="text-[#797979] text-sm lg:text-base">Teams</p>
          </div>
          <div
            onClick={() => handleSelect("analytics")}
            className={`flex flex-col lg:flex-row items-center lg:gap-5 p-0.5 lg:p-2 cursor-pointer w-16 lg:w-full ${
              selected === "analytics"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Analytics} alt="Analytics" className="w-5 h-5 lg:w-6 lg:h-6" />
            <p className="text-[#797979] text-sm lg:text-base">Analytics</p>
          </div>
        </div>
        <button className="mt-4 cursor-pointer p-0.5 lg:p-2 xl:p-4 rounded-lg flex flex-col mx-auto lg:flex-row items-center justify-center gap-1 lg:gap-3 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] w-16 lg:w-full" onClick={handlePopupOpen}>
          <p className="text-[#FFFFFF] text-sm lg:text-base hidden lg:block">Create new task</p>
          <p className="text-[#FFFFFF] text-sm lg:text-base lg:hidden">New Task</p>
          <Image src={Add} alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
      <button className="w-16 mx-auto p-1 bg-[#F4F4F4] text-sm lg:text-base block lg:hidden text-[#797979] rounded" onClick={handleLogout}>
            Logout
          </button>
      <div className="bg-[#F3F3F3] flex items-center justify-center p-1 xl:p-2 rounded-lg cursor-pointer mx-auto w-16 lg:w-full">
        <Image src={Download} alt="" className="w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10" />
        <div>
          <p className="text-[#666666] font-medium text-base xl:text-lg hidden lg:block">Download the app</p>
          <p className="text-[#666666] text-xs  hidden lg:block">Get the full experience </p>
        </div>
      </div>
      </div>
      
    </div>
  );
}
