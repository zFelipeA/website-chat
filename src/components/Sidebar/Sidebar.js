"use client";

import Image from "next/image";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function Sidebar() {
    const { user, logout } = useContext(SocketContext);

    return (
        <div className="hidden p-5 w-[23.0rem] min-h-full rounded-lg bg-[#FFFFFF] border-2 border-[#e9e9e9] flex-col justify-between md:flex">
            <div className="mt-10 flex flex-col items-center justify-center">
                <div className="w-28 h-28 relative">
                    <Image src={`/avatars/${user?.avatar}.png`} fill={true} alt="avatar" />
                </div>

                <p className="mt-5 text-[1.5rem] font-semibold">{user?.name}</p>

                <hr className="mt-5 min-w-full h-[0.2rem] border-0 bg-[#e9e9e9]" />

                <button className="mt-5 min-w-full p-5 text-xl text-center font-medium rounded-lg bg-blue-200 border-2 border-blue-300 hover:bg-blue-300 transition-all duration-500">
                    Chat Global
                </button>
            </div>

            <div>
                <hr className="min-w-full h-[0.2rem] border-0 bg-[#e9e9e9]" />

                <button
                    onClick={logout}
                    className="mt-5 w-full h-[3.5rem] rounded-lg bg-red-300 border-2 border-red-400 text-[1.2rem] font-medium hover:bg-red-400 transition-all duration-500"
                >
                    SAIR
                </button>
            </div>
        </div>
    );
}
