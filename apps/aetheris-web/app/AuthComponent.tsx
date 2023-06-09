"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthComponent(): JSX.Element {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                You&apos;re signed in! Congratulations! <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn("discord")}>Sign in</button>
        </>
    );
}
