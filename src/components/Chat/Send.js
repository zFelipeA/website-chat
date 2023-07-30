"use client";

import { useContext, useRef } from "react";
import { VscSend } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { ImAttachment } from "react-icons/im";

import { SocketContext } from "@/hooks/useSocket";

export default function Send() {
    const messageRef = useRef("");
    const router = useRouter();
    const { user, sendMessage } = useContext(SocketContext);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!user) {
            router.push("/chat");
        }

        const message = messageRef.current.value;
        if (!message || message === "" || message === " ") {
            return false;
        }

        sendMessage(message);
        messageRef.current.value = "";
    }

    return (
        <div className="flex items-center justify-between gap-3">
            <div className="px-5 w-full h-[4.5rem] bg-[#FFFFFF] border-2 border-[#e9e9e9] rounded-lg flex items-center gap-5">
                <div className="text-zinc-500">
                    <ImAttachment size={15} />
                </div>

                <form id="message" onSubmit={handleSubmit} className="w-full h-full">
                    <label htmlFor="send-message" className="sr-only">
                        Digite sua mensagem
                    </label>
                    <input ref={messageRef} required={true} id="send-message" name="send-message" type="text" placeholder="Digite sua mensagem" className="w-full h-full text-[1.3rem] focus:outline-none" />
                </form>
            </div>

            <button
                type="submit"
                form="message"
                className="w-[4.5rem] h-[4.5rem] bg-[#FFFFFF] border-2 border-[#e9e9e9] rounded-lg flex items-center justify-center text-zinc-500 hover:bg-[#CCE0FA] hover:border-[#5B97EC] hover:text-[#5B97EC] transition-all duration-500"
            >
                <VscSend size={20} />
            </button>
        </div>
    );
}
