import Image from "next/image";
import close from "../../public/images/close.svg";
import resize from "../../public/images/resize.svg";
import share from "../../public/images/share-1.svg";
import star from "../../public/images/star.svg";
import status from "../../public/images/status.svg";
import priority from "../../public/images/priority.svg";
import deadline from "../../public/images/deadline.svg";
import description from "../../public/images/description.svg";
import add from "../../public/images/add-custom-prop-modal.svg";
export default function TaskModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-2/6 h-5/6 rounded-lg p-4">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Image
              src={close}
              onClick={onClose}
              alt=""
              className="cursor-pointer"
            />
            <Image src={resize} alt="" className="cursor-pointer" />
          </div>

          <div className="flex justify-between gap-2">
            <div className="p-2 bg-[#F4F4F4] flex gap-2 rounded items-center cursor-pointer">
              <p className="text-sm">Share</p>
              <Image src={share} alt="" width={20} height={20} />
            </div>

            <div className="p-2 bg-[#F4F4F4] flex gap-2 rounded items-center cursor-pointer">
              <p className="text-sm">Favourite</p>
              <Image src={star} alt="" width={20} height={20} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <input
            type="text"
            placeholder="Title"
            className="text-2xl font-semibold mb-4 text-gray-600 placeholder-gray-400 focus:outline-none"
          />

          <div className="flex justify-between mt-5 w-5/6">
            <div className="flex gap-2">
            <Image src={status} alt="" width={18} height={18} />
            <p className="text-[#666666] text-sm">Status</p>
            </div>
            <input
            type="text"
            placeholder="Not Selected"
            className=" placeholder-[#C1BDBD] text-sm  focus:outline-none"
          />
            {/* <p className="text-[#C1BDBD] text-sm">Not Selected</p> */}
          </div>
          <div className="flex justify-between mt-10 w-5/6">
            <div className="flex gap-2">
            <Image src={priority} alt="" width={18} height={18} />
            <p className="text-[#666666] text-sm">Priority</p>
            </div>
            <input
            type="text"
            placeholder="Not Selected"
            className=" placeholder-[#C1BDBD] text-sm  focus:outline-none"
          />
          </div>
          <div className="flex justify-between  mt-10 w-5/6">
            <div className="flex gap-2">
            <Image src={deadline} alt="" width={18} height={18} />
            <p className="text-[#666666] text-sm">Deadline</p>
            </div>
            <input
            type="text"
            placeholder="Not Selected"
            className=" placeholder-[#C1BDBD] text-sm  focus:outline-none"
          />
          </div>
          <div className="flex justify-between  mt-10 w-5/6">
            <div className="flex gap-2">
            <Image src={description} alt="" width={18} height={18} />
            <p className="text-[#666666] text-sm">Description</p>
            </div>
            <input
            type="text"
            placeholder="Not Selected"
            className=" placeholder-[#C1BDBD] text-sm  focus:outline-none"
          />
          </div>
          <div className="flex mt-10 gap-6 cursor-pointer">
            <Image src={add} alt=" "  width={18} height={18} />
            <p className="text-sm">Add Custom Property</p>
          </div>

          <hr className="text-[#DEDEDE] mt-10"/>

          <p className="text-[#C0BDBD] text-xs p-2">Start writing, or drag your own files here</p>
        </div>
      </div>
    </div>
  );
}
