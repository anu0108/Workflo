"use client"
import axios from "axios";
import { Barlow, Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IconContext } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const barlow = Barlow({ subsets: ["latin"], weight: "600" });
const inter = Inter({ subsets: ["latin"], weight: "400" });
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const router = useRouter();

  const handleClick = () => setIsRevealPwd(!isRevealPwd);

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PORT}/login`, {
        email,
        password,
      },
      {
        withCredentials: true, // To include cookies in the request
      });
      if (response.data.message === "Logged in successfully") {
        // Redirect to a different page or show a success message
        router.push('/dashboard')
        toast.success("Login Successful");
      } else {
        // Handle incorrect credentials or other errors
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error
    }
  };

  return (
    <div
      className={`bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF] h-screen w-screen  py-24`}
    >
      <div className="bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] w-2/5 h-[476px] border border-[#CECECE] mx-auto rounded-2xl flex flex-col items-center justify-center gap-10">
        <p
          className={`font-semibold text-4xl text-[#2D2D2D] ${barlow.className}`}
        >
          Welcome to <span className="text-[#4534ac]">Workflo!</span>
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <input
            className={`h-14 w-[528px] rounded-lg bg-[#EBEBEB] py-4 px-3 text-[#606060] ${inter.className} border border-transparent focus:border-[#999999] outline-none`}
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-[528px]">
            <input
              className={`h-14 w-full rounded-lg bg-[#EBEBEB] py-4 px-3 text-[#606060] ${inter.className} border border-transparent focus:border-[#999999] outline-none pr-10`}
              type={isRevealPwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center px-3 text-[#aaaaaa] cursor-pointer text-[1.3rem]"
              onClick={handleClick}
            >
              {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            className={`bg-custom-gradient h-14 w-[528px] p-4 rounded-lg text-white ${inter.className}`}
          >
            Login
          </button>
        </form>
        <p className="text-md text-[#606060]">
          Don&apos;t have an account? Create a{" "}
          <Link href="/signup">
            <span
              className={`text-[#0054A1] ${inter.className} cursor-pointer`}
            >
              new account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
