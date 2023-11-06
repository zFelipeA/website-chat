"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageTitle({ send, text }) {
    const { user } = useContext(SocketContext);
    if (user?.id === send) {
        return <p className={`pt-5 px-5 text-[1.0rem] font-bold text-right sm:text-[1.2rem]`}>{text}</p>;
    }

    return <p className={`pt-5 px-5 text-[1.0rem] font-bold sm:text-[1.2rem]`}>{text}</p>;
}
