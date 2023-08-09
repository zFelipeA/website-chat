"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

export const SocketContext = createContext({
    user: null,
    socket: null,
    message: [],
    setup: () => {},
    sendMessage: () => {},
});

export function SocketProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState([]);

    const setup = useCallback(
        async name => {
            await fetch("/api/socket");
            const socketConnection = new WebSocket(`wss:///website-chat-production.up.railway.app/api/socket`);
            socketConnection.addEventListener("open", () => {
                setSocket(socketConnection);
                setUser({ name: name });
                router.push("/");
            });

            socketConnection.addEventListener("message", ({ data }) => {
                const packet = JSON.parse(data);
                if (packet) {
                    switch (packet.type) {
                        case "server-setup":
                            setMessage(packet.content.messages);
                            setUser({ name: name, owner_id: packet.content.owner_id });
                            break;
                        case "new-server-message":
                            setMessage(packet.content.messages);
                            break;
                    }
                }
            });
        },
        [router]
    );

    const sendMessage = useCallback(
        async message => {
            if (!socket) {
                return false;
            }

            if (!user || !user.owner_id) {
                return false;
            }

            socket.send(
                JSON.stringify({
                    type: "new-client-message",
                    content: {
                        message,
                        owner_name: user.name,
                        owner_id: user.owner_id,
                    },
                })
            );
        },
        [socket, user]
    );

    const logout = useCallback(async () => {
        if (!user) {
            return false;
        }

        socket.close(1000, "disconnect");
        setUser(null);
        router.push("/");
    }, [user, socket, router]);

    useEffect(() => {
        if (socket) return () => socket.close(1000, "disconnect");
    }, [socket]);

    const SocketContextValue = {
        user,
        message,
        setup,
        logout,
        sendMessage,
    };

    return <SocketContext.Provider value={SocketContextValue}>{children}</SocketContext.Provider>;
}
