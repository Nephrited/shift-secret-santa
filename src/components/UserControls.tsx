"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import clsx from "clsx";
import InlineSelect from "@/components/InlineSelect";
import {getUser, registerUser} from "@/backend/data";
import {useEffect, useState} from "react";

export enum SantaChoice {
    ART,
    WISHLIST,
    EITHER
}

export enum BackupChoice {
    DO,
    DONOT
}

const santaChoices = [{text: "art", value: SantaChoice.ART}, {
    text: "a wishlist item",
    value: SantaChoice.WISHLIST
}, {text: "either art or a wishlist item", value: SantaChoice.EITHER}];
const backupChoices = [{text: "do", value: BackupChoice.DO}, {text: "do not", value: BackupChoice.DONOT}];

const paragraphStyle = "mb-4";
export const buttonStyles = "my-2 rounded p-3 bg-purple-700 text-center text-white hover:bg-purple-400 transition-colors duration-300 ease-in-out w-full disabled:bg-gray-400 disabled:cursor-not-allowed";

export const UserControls = () => {
    const {data: session} = useSession();

    useEffect(() => {
        getUserData();
    }, [session]);

    const [selectedReceiving, setSelectedReceiving] = useState<string>();
    const [selectedGiving, setSelectedGiving] = useState<string>();
    const [selectedBackup, setSelectedBackup] = useState<string>();
    const [isRegistered, setisRegistered] = useState<boolean>(false);
    const [isSubmitting, setisSubmitting] = useState<boolean>(false);
    const [giftee, setGiftee] = useState<string>();

    function onReceiveSelect(value: string) {
        setSelectedReceiving(value);
    }

    function onGiveSelect(value: string) {
        setSelectedGiving(value);
    }

    function onBackupSelect(value: string) {
        setSelectedBackup(value);
    }

    async function getUserData() {
        if (typeof session?.user?.name === "string") {
            const user = await getUser(session.user.name);
            if(user) {
                console.log("Got user data (client)" + session.user.name);
                setSelectedReceiving(user.receiving);
                setSelectedGiving(user.giving);
                setSelectedBackup(user.backup);
                setGiftee(user.giftee);
                setisRegistered(true);
            }

        }
    }

    async function submitUserRegistration() {
        setisSubmitting(true);
        if (typeof session?.user?.name === "string" && !!selectedReceiving && !!selectedGiving && !!selectedBackup) {
            await registerUser({
                username: session.user.name,
                receiving: selectedReceiving,
                giving: selectedGiving,
                backup: selectedBackup
            });
            console.log("Registered user (client)" + session?.user);
            setisRegistered(true);
        }
        setisSubmitting(false);
    }

    return (
        <div className="flex w-full flex-col items-center">
            {!session && (
                <button className={clsx(buttonStyles)} onClick={() => signIn("discord")}>
                    Login with Discord
                </button>
            )}
            {session && !isRegistered && (
                <>
                    <div>
                        <img src={session.user?.image || undefined} alt={session.user?.name || "Unknown User"}
                             className="rounded-full w-12 h-12"/>
                        <p className="text-center mb-2">Hi {session.user?.name}!</p>
                        <div>You are not currently registered for Secret Santa!</div>
                        <div><h2 className="text-l font-bold mb-2 mt-1">Joining Secret Santa:</h2>
                            <p className={paragraphStyle}>I, {session.user?.name}, wish to register to receive <InlineSelect options={santaChoices}
                                                                                                  onSelect={onReceiveSelect}/>,
                                and to give <InlineSelect options={santaChoices} onSelect={onGiveSelect}/>.</p>
                            <p className={paragraphStyle}>I understand that registering is a commitment to complete my artwork or provide proof of
                                a wishlist item being purchased before the cutoff date of the 24th of December.</p>
                            <p className={paragraphStyle}>I <InlineSelect options={backupChoices} onSelect={onBackupSelect}></InlineSelect> wish to
                                register as a backup gift giver, in case another person is unable to provide their gift.
                            </p>
                            <button className={clsx(buttonStyles)} onClick={() => submitUserRegistration()}
                                    disabled={isSubmitting || !selectedGiving || !selectedReceiving || !selectedBackup}>{!isSubmitting ? "Register" : "Registering..."}</button>
                        </div>
                    </div>
                    <button className={clsx(buttonStyles)} onClick={() => signOut()}>
                        Logout
                    </button>
                </>
            )}
            {session && isRegistered && (
                <>
                    <div>
                        <img src={session.user?.image || undefined} alt={session.user?.name || "Unknown User"}
                             className="rounded-full w-12 h-12"/>
                        <p className="text-center">Hi {session.user?.name}!</p>
                        <div>You are registered for Secret Santa!</div>
                        <div>You have signed up to recieve: {selectedReceiving ? SantaChoice[Number(selectedReceiving)] : 'Error'}</div>
                        <div>...and to give: {selectedGiving ? SantaChoice[Number(selectedGiving)] : 'Error'}</div>
                        <div>Your giftee is {giftee ? giftee : 'not yet assigned! Check back on the 8th!'}</div>
                    </div>
                    <button className={clsx(buttonStyles)} onClick={() => signOut()}>
                        Logout
                    </button>
                </>
                )}
        </div>
    );
}