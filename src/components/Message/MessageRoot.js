"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageRoot({ send, children }) {
    const { user } = useContext(SocketContext);

    if (user?.owner_id === send) {
        return <div className="flex justify-end">{children}</div>;
    }

    return <div className="flex">{children}</div>;
}
