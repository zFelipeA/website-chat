"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

export const SocketContext = createContext({
    user: null,
    socket: null,
    message: [],
    setup: () => {},
    sendMessage: () => {},
    updateMessage: () => {},
    logout: () => {},
});

export function SocketProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState([]);

    const setup = useCallback(async (name, avatar, lobby, password) => {
        const socketConnection = new WebSocket(`wss://website-chat-server.onrender.com/?name=${name}&avatar=${avatar}&lobby=${lobby}&password=${password}`);

        socketConnection.onopen = () => {
            setSocket({ websocket: socketConnection, connections: {}, channel: "loading" });
        };

        socketConnection.onerror = () => {
            setUser(null);
            setSocket(null);
        };

        socketConnection.onclose = () => {
            setUser(null);
            setSocket(null);
        };

        socketConnection.onmessage = (event) => {
            try {
                const json = JSON.parse(event.data);
                switch (json.type) {
                    case "setup-client":
                        setMessage(json.packet.messages);
                        setUser({ id: json.packet.id, name: json.packet.name, avatar: json.packet.avatar });
                        setSocket((preSocket) => ({ ...preSocket, connections: json.packet.connections, channel: json.packet.channel }));
                        break;
                    case "send-client-message":
                        setMessage(json.packet.messages);
                        setSocket((preSocket) => ({ ...preSocket, connections: json.packet.connections }));
                        break;
                    case "update-client-connections":
                        setSocket((preSocket) => ({ ...preSocket, connections: json.packet.connections }));
                        break;
                }
            } catch (error) {
                console.log("> erro ao receber mensagem", error);
            }
        };
    }, []);

    const sendMessage = useCallback(
        async (message) => {
            if (!socket) {
                return false;
            }

            const data = JSON.stringify({
                type: "new-client-message",
                content: {
                    message,
                },
            });

            socket.websocket.send(data);
        },
        [socket]
    );

    const logout = useCallback(async () => {
        if (!socket) {
            return false;
        }

        setUser(null);
        setSocket(null);
        router.push("/");
        socket.websocket.close(1000, "disconnect");
    }, [socket, router]);

    useEffect(() => {
        if (socket && socket.channel !== "loading") {
            return () => socket.websocket.close(1000, "disconnect");
        }
    }, []);

    const socketContextValue = {
        user,
        socket,
        message,
        setup,
        sendMessage,
        logout,
    };

    return <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>;
}
