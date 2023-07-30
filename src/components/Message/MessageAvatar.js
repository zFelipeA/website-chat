"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageAvatar({ send, name, children }) {
    const { user } = useContext(SocketContext);

    if (user?.owner_id === send) {
        return (
            <>
                <div className="mr-5">
                    <p className="text-[1.5rem] font-semibold text-right">{name}</p>
                    {children}
                </div>

                <div className="w-16 h-16 rounded-full bg-zinc-500" />
            </>
        );
    }

    return (
        <>
            <div className="w-16 h-16 rounded-full bg-zinc-500" />

            <div className="ml-5">
                <p className="text-[1.5rem] font-semibold">{name}</p>
                {children}
            </div>
        </>
    );
}
