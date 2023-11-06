"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageBackground({ padding = "[5.7rem]", send, children }) {
    const { user } = useContext(SocketContext);
    const possiible = ["mr-[5.7rem]", "mr-3", "ml-[5.7rem]", "ml-3"];
    if (user?.id === send) {
        return <div className={`mr-${padding} rounded-tl-lg rounded-bl-lg rounded-br-lg bg-[#CCE0FA]`}>{children}</div>;
    }

    return <div className={`ml-${padding} rounded-tr-lg rounded-bl-lg rounded-br-lg bg-[#e9e9e9]`}>{children}</div>;
}
