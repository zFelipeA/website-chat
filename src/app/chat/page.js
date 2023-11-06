import Box from "@/components/Chat/Box";
import Send from "@/components/Chat/Send";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Chat() {
    return (
        <section className="p-10 max-w-screen max-h-screen w-screen min-h-screen bg-[#F9FAFC] flex gap-5">
            <Sidebar />

            <div className="max-h-full grow flex flex-col gap-5">
                <Box />
                <Send />
            </div>
        </section>
    );
}
