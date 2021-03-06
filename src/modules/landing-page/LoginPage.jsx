import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LgLogo } from "../../icons";
import SvgSolidBug from "../../icons/SolidBug";
import SvgSolidDiscord from "../../icons/SolidDiscord";
import SvgSolidGitHub from "../../icons/SolidGitHub";
import SvgSolidTwitter from "../../icons/SolidTwitter";
import {
    apiBaseUrl,
    isStaging,
    loginNextPathKey,
    __prod__,
} from "../../lib/constants";
import { isServer } from "../../lib/isServer";
import { Button } from "../../ui/Button";
import { useSaveTokensFromQueryParams } from "../auth/useSaveTokensFromQueryParams";
import { useTokenStore } from "../auth/useTokenStore";
import { HeaderController } from "../display/HeaderController";
import { AuthContext } from "../auth/AuthProvider";

const LoginButton = ({ children, onClick, oauthUrl, dev, ...props }) => {
    const { query } = useRouter();
    const clickHandler = useCallback(() => {
        if (typeof query.next === "string" && query.next) {
            try {
                localStorage.setItem(loginNextPathKey, query.next);
            } catch {}
        }

        window.location.href = oauthUrl;
    }, [query, oauthUrl]);

    return (
        <Button
            className="justify-center text-base py-3 mt-2"
            color={dev ? "primary" : "secondary"}
            onClick={oauthUrl ? clickHandler : onClick}
            {...props}
        >
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: "1fr auto 1fr",
                }}
            >
                {children[0]}
                {children[1]}
                <div />
            </div>
        </Button>
    );
};

export const LoginPage = () => {
    useSaveTokensFromQueryParams();
    const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));
    const { setConn } = useContext(AuthContext);
    const { push } = useRouter();
    const [tokensChecked, setTokensChecked] = useState(false);

    useEffect(() => {
        // only want this on mount
        setConn(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (hasTokens) {
            push("/");
        } else {
            setTokensChecked(true);
        }
    }, [hasTokens, push]);

    const queryParams =
        isStaging && !isServer
            ? "?redirect_after_base=" + window.location.origin
            : "";

    if (!tokensChecked) return null;

    return (
        <>
            <div
                className="grid w-full h-full"
                style={{
                    gridTemplateRows: "1fr auto 1fr",
                }}
            >
                <HeaderController embed={{}} title="Login" />
                <div className="hidden sm:flex" />
                <div className="flex justify-self-center self-center sm:hidden">
                    <LgLogo />
                </div>
                <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
                    <div className="flex gap-2 flex-col">
                        <span className="text-3xl text-primary-100 font-bold">
                            Welcome
                        </span>
                        <div className="text-primary-100 flex-wrap">
                            By logging in you accept our&nbsp;
                            <a
                                href="/privacy-policy.html"
                                className="text-accent hover:underline"
                            >
                                Privacy Policy
                            </a>
                            &nbsp;and&nbsp;
                            <a
                                href="/terms.html"
                                className="text-accent hover:underline"
                            >
                                Terms of Service
                            </a>
                            .
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <LoginButton
                            oauthUrl={`${apiBaseUrl}/auth/github/web${queryParams}`}
                        >
                            <SvgSolidGitHub width={20} height={20} />
                            Log in with GitHub
                        </LoginButton>
                        <LoginButton
                            oauthUrl={`${apiBaseUrl}/auth/twitter/web${queryParams}`}
                        >
                            <SvgSolidTwitter width={20} height={20} />
                            Log in with Twitter
                        </LoginButton>

                        <LoginButton
                            oauthUrl={`${apiBaseUrl}/auth/discord/web${queryParams}`}
                        >
                            <SvgSolidDiscord width={20} height={20} />
                            Log in with Discord
                        </LoginButton>

                        {!__prod__ ? (
                            <LoginButton
                                dev
                                onClick={async () => {
                                    // eslint-disable-next-line no-alert
                                    const name = window.prompt("username");
                                    if (!name) {
                                        return;
                                    }
                                    const r = await fetch(
                                        `${apiBaseUrl}/dev/test-info?username=` +
                                            name
                                    );
                                    const d = await r.json();
                                    useTokenStore.getState().setTokens({
                                        accessToken: d.accessToken,
                                        refreshToken: d.refreshToken,
                                    });
                                    push("/");
                                }}
                            >
                                <SvgSolidBug width={20} height={20} />
                                Create a test user
                            </LoginButton>
                        ) : null}
                    </div>
                </div>
                <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
                    <div className="hidden sm:flex">
                        <LgLogo />
                    </div>
                    <div className="flex flex-row gap-6 text-primary-300">
                        <a
                            href="https://github.com/ss497254"
                            className="ml-2 hover:text-primary-200"
                        >
                            Report a bug
                        </a>
                        <div className="flex flex-row gap-6 sm:gap-4">
                            <a
                                href="https://github.com/ss497254"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SvgSolidGitHub
                                    width={20}
                                    height={20}
                                    className="ml-2 cursor-pointer hover:text-primary-200"
                                />
                            </a>
                            <a
                                href="https://discord.gg/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SvgSolidDiscord
                                    width={20}
                                    height={20}
                                    className="ml-2 hover:text-primary-200"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
