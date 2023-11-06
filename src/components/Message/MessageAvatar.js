"use client";

import Image from "next/image";
import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageAvatar({ send, status = "red-400", avatar = "1" }) {
    const { user } = useContext(SocketContext);
    const possiible = ["bg-emerald-200", "bg-red-400"];
    if (user?.id === send) {
        return (
            <div className="ml-5 w-[4.5rem] h-[4.5rem] relative border-2 border-white">
                <Image src={`/avatars/${avatar}.png`} fill={true} alt="avatar" />

                <div className={`absolute bottom-0 right-0 w-[1.3rem] h-[1.3rem] rounded-full border-2 border-white bg-${status}`} />
                <div className={`animate-ping absolute bottom-[0.11rem] right-[0.15rem] w-[1.0rem] h-[1.0rem] rounded-full bg-${status}`} />
            </div>
        );
    }

    return (
        <div className="mr-5 w-[4.5rem] h-[4.5rem] relative border-2 border-white">
            <Image src={`/avatars/${avatar}.png`} fill={true} alt="avatar" />

            <div className={`absolute bottom-0 right-0 w-[1.3rem] h-[1.3rem] rounded-full border-2 border-white bg-${status}`} />
            <div className={`animate-ping absolute bottom-[0.11rem] right-[0.15rem] w-[1.0rem] h-[1.0rem] rounded-full bg-${status}`} />
        </div>
    );
}
