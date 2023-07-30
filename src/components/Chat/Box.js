"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import Message from "@/components/Message/index";

import { SocketContext } from "@/hooks/useSocket";

export default function Box() {
    const router = useRouter();
    const { user, message } = useContext(SocketContext);

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    return (
        <div className="p-5 w-full h-full rounded-xl bg-[#FFFFFF] border-2 border-[#e9e9e9] sm:pt-10">
            <div className="flex flex-col gap-2">
                {message.map((value, index) => (
                    <Message.Root key={index} send={value.owner_id}>
                        {message[index - 1] && message[index - 1].owner_id === value.owner_id && <Message.Text send={value.owner_id} text={value.message} />}

                        {message[index - 1] && message[index - 1].owner_id !== value.owner_id && (
                            <Message.Avatar send={value.owner_id} name={value.owner}>
                                <Message.Text padding="0" send={value.owner_id} text={value.message} />
                            </Message.Avatar>
                        )}

                        {index === 0 && (
                            <Message.Avatar send={value.owner_id} name={value.owner}>
                                <Message.Text padding="0" send={value.owner_id} text={value.message} />
                            </Message.Avatar>
                        )}
                    </Message.Root>
                ))}
            </div>
        </div>
    );
}
