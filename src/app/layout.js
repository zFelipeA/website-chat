import "@/styles/global.css";

import { Poppins } from "next/font/google";

import { SocketProvider } from "@/hooks/useSocket";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});
export const metadata = {
    title: "Chat realtime",
    description: "Created by zFelpszada",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <body className={poppins.className}>
                <main id="app">
                    <SocketProvider>{children}</SocketProvider>
                </main>
            </body>
        </html>
    );
}
