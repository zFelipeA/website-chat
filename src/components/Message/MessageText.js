"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageText({ padding = "20", send, text }) {
    const { user } = useContext(SocketContext);

    const possiible = ["mr-20", "mr-3", "ml-20", "ml-3"];

    if (user?.owner_id === send) {
        return <p className={`mt-2 mr-${padding} p-5 rounded-lg bg-[#CCE0FA] text-[1.0rem] font-medium max-w-[60vw] text-center break-words sm:text-[1.1rem]`}>{text}</p>;
    }

    return <p className={`mt-2 ml-${padding} p-5 rounded-lg bg-[#e9e9e9] text-[1.0rem] font-medium max-w-[60vw] break-words sm:text-[1.1rem]`}>{text}</p>;
}
