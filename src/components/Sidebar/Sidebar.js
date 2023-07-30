"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function Sidebar() {
    const { user, logout } = useContext(SocketContext);

    return (
        <div className="hidden p-5 w-[23.0rem] min-h-full rounded-lg bg-[#FFFFFF] border-2 border-[#e9e9e9] flex-col justify-between md:flex">
            <div className="mt-10 flex flex-col items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-zinc-500" />

                <p className="mt-5 text-[1.5rem] font-semibold">{user?.name}</p>

                <hr className="mt-5 min-w-full h-[0.2rem] border-0 bg-[#e9e9e9]" />

                <p className="mt-5 min-w-full p-5 text-center rounded-lg bg-[#CCE0FA]">CHAT 1</p>
            </div>

            <div>
                <hr className="min-w-full h-[0.2rem] border-0 bg-[#e9e9e9]" />

                <button onClick={logout} className="mt-5 w-full h-[3.0rem] rounded-lg bg-red-300 text-[1.2rem] font-medium hover:bg-red-400 transition-all duration-500">
                    SAIR
                </button>
            </div>
        </div>
    );
}
