"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

import { SocketContext } from "@/hooks/useSocket";

export default function LoginForm() {
    const nameRef = useRef("");
    const router = useRouter();
    const { user, setup } = useContext(SocketContext);

    useEffect(() => {
        if (user) {
            router.push("/chat");
        }
    }, [user, router]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (user) {
            router.push("/chat");
        }

        const name = nameRef.current.value;
        if (!name || name === "" || name === " ") {
            return false;
        }

        setup(name);
    }

    return (
        <form onSubmit={handleSubmit} className="w-[30.0rem]">
            <div>
                <label className="flex justify-center text-[1.5rem] font-medium">Qual seu nome?</label>
                <input
                    ref={nameRef}
                    required={true}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Digite seu nome"
                    className="mt-5 pl-4 w-full h-[5.0rem] text-[1.3rem] bg-[#FFFFFF] border-2 border-[#e9e9e9] rounded-lg focus:outline-none"
                />
            </div>

            <button type="submit" className="mt-10 w-full h-[6.0rem] rounded-lg text-[1.5rem] font-medium bg-[#CCE0FA] border-2 border-[#5B97EC] hover:bg-[#5B97EC] transition-all duration-500">
                ENTRAR
            </button>
        </form>
    );
}
