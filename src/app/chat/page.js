import Box from "@/components/Chat/Box";
import Send from "@/components/Chat/Send";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Chat() {
    return (
        <section className="p-5 max-w-screen w-screen min-h-screen bg-[#F9FAFC] flex gap-5 sm:pt-10">
            <Sidebar />

            <div className="grow flex flex-col gap-5">
                <Box />
                <Send />
            </div>
        </section>
    );
}
