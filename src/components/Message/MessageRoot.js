"use client";

import { useContext } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function MessageRoot({ marginTop = "0", send, children }) {
    const { user } = useContext(SocketContext);
    const possiible = ["mt-0", "mt-5"];
    if (user?.id === send) {
        return <div className={`mt-${marginTop} flex justify-end`}>{children}</div>;
    }

    return <div className={`mt-${marginTop} flex`}>{children}</div>;
}
