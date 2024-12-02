"use client";

import {UserControls} from "@/components/UserControls";
import {SessionProvider} from "next-auth/react";

export default function Home() {
    return (
        <SessionProvider>
            <div className="flex flex-col items-center justify-center h-screen">
                <main className="flex flex-col gap-8 row-start-2 items-center pl-2 pr-2 max-w-lg">
                    <h1 className="text-2xl font-bold mt-2">
                        Shift Secret Santa 2024!
                    </h1>
                    <UserControls/>
                </main>
                <section className="m-10">
                    Welcome to the Shift Secret Santa (SSS) event! <br/>
                    This year we have a custom app. It&#39;s ugly. It&#39;s probably buggy! I&#39;m still working on it! But it works! <br/>
                    Users can register to give and receive either art, wishlist items, or both! <br/>
                    <h2 className="text-xl pb-2 pt-1">
                        Rules:
                    </h2>
                    <ol className={"list-disc"}>
                        <li>Users must register both to give and receive a gift.</li>
                        <li>Users may supply a character reference if they wish to receive art gifts.</li>
                        <li>Users may supply an Amazon or Steam wishlist if they wish to receive purchased items.</li>
                        <li>Wishlist item purchases are limited to <em>£30 GBP max value.</em></li>
                        <li>Signups end on the <em>8th of December 2024.</em></li>
                        <li>Art gifts must be uploaded by the <em>24th of December 2024, UK time.</em></li>
                        <li>Proof of shipping or delivery of wishlist items must be sent directly to Nephi (nephrited) via Discord by the <em>14th of December, 2024, UK time.</em></li>
                        <li>Users must not contact their assigned recipient! Questions should be proxied through Weh (notacatbot).</li>
                    </ol>
                    <h2 className="text-xl pb-2 pt-1">
                        Q&A:
                    </h2>
                    <ol className={"list-disc"}>
                        <li>Q: How do I provide art references?<br/>
                        A: The app will have a place to upload your references later in the week! If you want to get it done immediately, send them to Nephi.</li>
                        <li>Q: Can we provide references or wishlists for other people?<br/>
                        A: No. The event is about an exchange between people taking part, within the community. If you do not wish to receive a gift, but still wish to give, might I suggest a donation to charity?</li>
                    </ol>
                </section>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    Made incredibly quickly by Nephi! 🚀 Ask in the Discord server for help!
                </footer>
            </div>
        </SessionProvider>
    );
}
