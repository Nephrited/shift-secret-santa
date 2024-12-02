"use client";

import {UserControls} from "@/components/UserControls";
import {SessionProvider} from "next-auth/react";

export default function Home() {
    return (
        <SessionProvider>
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <h1>
                        Shift Secret Santa
                    </h1>
                    <UserControls/>
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    Made incredibly quickly by Nephi! 🚀 Ask in the Discord server for help!
                </footer>
            </div>
        </SessionProvider>
    );
}
