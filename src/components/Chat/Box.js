"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

import Message from "@/components/Message/index";

import { SocketContext } from "@/hooks/useSocket";

export default function Box() {
    const router = useRouter();
    const messageRef = useRef(null);
    const { user, message, socket } = useContext(SocketContext);

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    useEffect(() => {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }, [message]);

    return (
        <div ref={messageRef} className="p-5 max-h-full w-full h-full rounded-xl bg-[#FFFFFF] border-2 border-[#e9e9e9] sm:pt-10 overflow-y-scroll">
            <div className="flex flex-col gap-2">
                {message.map((value, index) => {
                    const date = new Date();
                    const myTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const formateDate = new Intl.DateTimeFormat("default", {
                        timeZone: myTimeZone,
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    date.setUTCHours(value.hour, value.minute, 0);

                    const dateFormat = formateDate.format(date);
                    const previousMessage = message[index - 1];
                    const previousMessageOwner = previousMessage && message[index - 1].owner_id;
                    if (previousMessage && previousMessageOwner === value.owner_id) {
                        return (
                            <Message.Root key={index} send={value.owner_id}>
                                <Message.Background send={value.owner_id}>
                                    <Message.Text text={value.text} date={`${dateFormat}`} />
                                </Message.Background>
                            </Message.Root>
                        );
                    }

                    const isMyMessage = user?.id === value.owner_id;
                    const isOwnerOnline = socket && socket.connections && socket.connections[value.owner_id];
                    if (previousMessage && previousMessageOwner !== value.owner_id && isMyMessage) {
                        return (
                            <Message.Root key={index} send={value.owner_id}>
                                <Message.Background padding="0" send={value.owner_id}>
                                    <Message.Text text={value.text} date={`${dateFormat}`} />
                                </Message.Background>

                                <Message.Avatar avatar={value.owner_avatar} status={isOwnerOnline === "online" ? "emerald-200" : "red-400"} send={value.owner_id} />
                            </Message.Root>
                        );
                    }

                    if (previousMessage && previousMessageOwner !== value.owner_id && !isMyMessage) {
                        return (
                            <Message.Root marginTop="5" key={index} send={value.owner_id}>
                                <Message.Avatar avatar={value.owner_avatar} status={isOwnerOnline === "online" ? "emerald-200" : "red-400"} send={value.owner_id} />

                                <Message.Background padding="0" send={value.owner_id}>
                                    <Message.Title send={value.owner_id} text={value.owner_name} />
                                    <Message.Text text={value.text} date={`${dateFormat}`} />
                                </Message.Background>
                            </Message.Root>
                        );
                    }

                    if (isMyMessage) {
                        return (
                            <Message.Root key={index} send={value.owner_id}>
                                <Message.Background padding="0" send={value.owner_id}>
                                    <Message.Text text={value.text} date={`${dateFormat}`} />
                                </Message.Background>

                                <Message.Avatar avatar={value.owner_avatar} status={isOwnerOnline === "online" ? "emerald-200" : "red-400"} send={value.owner_id} />
                            </Message.Root>
                        );
                    }

                    if (!isMyMessage) {
                        return (
                            <Message.Root key={index} send={value.owner_id}>
                                <Message.Avatar avatar={value.owner_avatar} status={isOwnerOnline === "online" ? "emerald-200" : "red-400"} send={value.owner_id} />

                                <Message.Background padding="0" send={value.owner_id}>
                                    <Message.Title send={value.owner_id} text={value.owner_name} />
                                    <Message.Text text={value.text} date={`${dateFormat}`} />
                                </Message.Background>
                            </Message.Root>
                        );
                    }
                })}
            </div>
        </div>
    );
}
