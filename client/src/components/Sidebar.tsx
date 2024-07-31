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
    <div className="w-80 bg-[#FFFFFF] p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center font-medium gap-3 ">
          <Image src={DP} alt="" width={40} height={40} />
          <p className="text-[#080808]">Joe Gardner</p>
        </div>
        <div className="flex mt-4 gap-4  justify-between">
          <div className="flex gap-4">
            <Image
              src={Bell}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src={Sun}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src={Arrow}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <button className="p-2 bg-[#F4F4F4] text-[#797979] rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <div
            onClick={() => handleSelect("home")}
            className={`flex items-center gap-5 p-2 cursor-pointer ${
              selected === "home"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Home} alt="Home" width={24} height={24} />
            <p className="text-[#797979]">Home</p>
          </div>
          <div
            onClick={() => handleSelect("boards")}
            className={`flex items-center gap-5 p-2 cursor-pointer ${
              selected === "boards"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Boards} alt="Boards" width={24} height={24} />
            <p className="text-[#797979]">Boards</p>
          </div>
          <div
            onClick={() => handleSelect("settings")}
            className={`flex items-center gap-5 p-2 cursor-pointer ${
              selected === "settings"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Settings} alt="Settings" width={24} height={24} />
            <p className="text-[#797979]">Settings</p>
          </div>
          <div
            onClick={() => handleSelect("teams")}
            className={`flex items-center gap-5 p-2 cursor-pointer ${
              selected === "teams"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Teams} alt="Teams" width={24} height={24} />
            <p className="text-[#797979]">Teams</p>
          </div>
          <div
            onClick={() => handleSelect("analytics")}
            className={`flex items-center gap-5 p-2 cursor-pointer ${
              selected === "analytics"
                ? "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
                : ""
            }`}
          >
            <Image src={Analytics} alt="Analytics" width={24} height={24} />
            <p className="text-[#797979]">Analytics</p>
          </div>
        </div>
        <button className="mt-4 cursor-pointer p-4 rounded-lg flex items-center justify-center gap-3 bg-gradient-to-b from-[#4C38C2] to-[#2F2188]" onClick={handlePopupOpen}>
          <p className="text-[#FFFFFF]">Create new task</p>
          <Image src={Add} alt="" />
        </button>
      </div>

      <div className="bg-[#F3F3F3] flex items-center p-2 rounded-lg cursor-pointer">
        <Image src={Download} alt="" />
        <div>
          <p className="text-[#666666] font-medium text-lg">Download the app</p>
          <p className="text-[#666666] text-xs">Get the full experience </p>
        </div>
      </div>
    </div>
  );
}
