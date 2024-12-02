"use client";

import {UserControls} from "@/components/UserControls";
import {SessionProvider} from "next-auth/react";

export default function Home() {
    return (
        <SessionProvider>
            <div className="flex flex-col items-center justify-center h-screen">
                <main className="flex flex-col gap-8 row-start-2 items-center pl-2 pr-2 max-w-lg">
                    <h1 className="text-2xl font-bold mt-2">
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
