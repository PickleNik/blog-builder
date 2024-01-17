"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GitHubLogo from "./icons/github";
import { FaGoogle } from "react-icons/fa";

type State = "error" | "idle" | "pending" | "success";

export function LoginButtons({ redirectTo }: { redirectTo: string }) {
    const [state, setState] = useState<State>("idle");

    async function handleSignIn(provider: string) {
        try {
            setState("pending");
            await signIn(provider, { callbackUrl: redirectTo });
        } catch (error) {
            setState("error");
        }
    }

    return (
        <>
            <div className="mx-auto rounded-md duration-300 hover:shadow-[0_0_2rem_-0.5rem_#FFF]">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleSignIn("google")}
                    disabled={state === "pending"}
                    className="google hover:bg-background relative mx-auto flex gap-4 border-none"
                >
                    Login with Google <FaGoogle />
                </Button>
            </div>
            <div className="mx-auto rounded-md duration-300 hover:shadow-[0_0_2rem_-0.5rem_#FFF]">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleSignIn("github")}
                    disabled={state === "pending"}
                    className="github hover:bg-background relative mx-auto flex gap-4 border-none"
                >
                    Login with GitHub <GitHubLogo />
                </Button>
            </div>
        </>
    );
}