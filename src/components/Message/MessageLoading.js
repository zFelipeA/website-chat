"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageLoading(send) {
    const { user } = useContext(SocketContext);
    if (user?.id === send) {
        return (
            <>
                <div className="ml-5 w-[4.5rem] h-[4.5rem] rounded-full bg-gray-400 animate-pulse" />

                <div className="rounded-tl-lg rounded-bl-lg rounded-br-lg bg-gray-400 animate-pulse">
                    <div className="pt-4 pl-5 pr-5 pb-5 ">
                        <p className="text-[1.0rem] text-gray-500 font-medium max-w-[60vw] text-left break-words sm:text-[1.2rem]">Carregando...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mr-5 w-[4.5rem] h-[4.5rem] rounded-full bg-gray-400 animate-pulse" />

            <div className="rounded-tr-lg rounded-bl-lg rounded-br-lg bg-gray-400 animate-pulse">
                <div className="pt-4 pl-5 pr-5 pb-5 ">
                    <p className="text-[1.0rem] text-gray-500 font-medium max-w-[60vw] break-words sm:text-[1.2rem]">Carregando...</p>
                </div>
            </div>
        </>
    );
}
