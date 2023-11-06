"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

import { SocketContext } from "@/hooks/useSocket";

const AVATARS = [...Array(9)];

export default function LoginForm() {
    const nameRef = useRef("");
    const router = useRouter();
    const [avatar, setAvatar] = useState(null);
    const { user, setup } = useContext(SocketContext);

    useEffect(() => {
        if (user) {
            router.push("/chat");
        }
    }, [user, router]);

    function selectAvatar(avatar) {
        setAvatar(avatar);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (user) {
            return router.push("/chat");
        }

        const name = nameRef.current.value;
        if (!name || name === "" || name === " ") {
            return false;
        }

        setup(name, avatar, "global", "none");
    }

    if (avatar === null) {
        return (
            <div>
                <h1 className="text-[2.0rem] font-semibold text-center">Selecione um avatar</h1>

                <div className="mt-10 grid grid-cols-3 gap-10">
                    {AVATARS.map((_, index) => (
                        <Image
                            key={index}
                            onClick={() => selectAvatar(index)}
                            src={`/avatars/${index}.png`}
                            alt="avatar"
                            width={80}
                            height={80}
                            style={{ objectFit: "cover" }}
                            className="cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full flex justify-center">
                <Image alt="avatar" src={`/avatars/${avatar}.png`} width={124} height={124} />
            </div>

            <form onSubmit={handleSubmit} className="mt-10 w-[30.0rem]">
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

                <button
                    type="submit"
                    className="mt-10 w-full h-[6.0rem] rounded-lg text-[1.5rem] font-medium bg-[#CCE0FA] border-2 border-[#5B97EC] hover:bg-[#5B97EC] transition-all duration-500"
                >
                    ENTRAR
                </button>

                <button
                    type="button"
                    onClick={() => selectAvatar(null)}
                    className="mt-10 w-full h-[6.0rem] rounded-lg text-[1.5rem] font-medium bg-red-200 border-2 border-red-400 hover:bg-red-400 transition-all duration-500"
                >
                    VOLTAR
                </button>
            </form>
        </div>
    );
}
