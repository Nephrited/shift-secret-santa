"use server";

import {put, list} from "@vercel/blob";

export async function registerUser(data: { username: string, receiving: string, giving: string, backup: string }) {
    await put('users2024/' + data.username, JSON.stringify(data), {access: 'public'});
    console.log('Registered user ' + data.username);
    return;
}

export async function getUser(username: string) {
    const response = await list();
    const userBlob = response.blobs.find(blob => blob.pathname.startsWith('users2024/' + username));
    if(!userBlob) {
        return null;
    }
    const userData = await fetch(userBlob.url).then(res => res.text());
    console.log(userData);
    return JSON.parse(userData);
}