import React, { useEffect, useState } from "react";
import { SolidTime, OutlineLike, SolidCaretRight } from "../../icons";
import { BubbleText } from "./BubbleText";
import { CardHeading } from "./CardHeading";
import { Button } from "./Button";
import { Tag } from "./Tag";
import { MultipleUsers, SingleUser } from "../UserAvatar";

export const Card = ({
    text,
    subtitle,
    avatarUrl,
    listeners,
    tags,
    onlikeChange = () => {},
    onClick,
    like = 0,
}) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col justify-between w-full p-4 rounded-lg transition duration-200 ease-in-out bg-gray-50 dark:bg-zinc-900 dark:text-white outline lg:outline-1 hover:outline-2 outline-gray-300 dark:outline-zinc-700 hover:outline-slate-300 dark:hover:outline-zinc-600 mb-4"
        >
            <CardHeading text={text} />
            <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2 w-full mt-3 mb-1">
                    {tags.slice(0, 5).map((tag, idx) => (
                        <Tag key={idx}>{tag}</Tag>
                    ))}
                    <div className="flex-grow"></div>
                    <div className="flex flex-shrink-0">
                        <BubbleText live={listeners > 0}>
                            {listeners > 0 ? listeners : "No Answers yet"}
                        </BubbleText>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full mt-1">
                    {avatarUrl ? (
                        <SingleUser
                            className="mr-2"
                            size="xxs"
                            src={avatarUrl}
                        />
                    ) : null}
                    <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-1 w-[30%]">
                        {subtitle}
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex gap-2">
                        <Button
                            className="w-8 h-5"
                            btn="light"
                            onClick={() => onlikeChange(1)}
                        >
                            <OutlineLike
                                className={`inline-block ${
                                    like === 1
                                        ? "text-green-500"
                                        : "text-transparent"
                                } stroke-green-500`}
                                size="18"
                            />
                        </Button>
                        <Button
                            className="w-8 h-5"
                            btn="light"
                            onClick={() => onlikeChange(-1)}
                        >
                            <OutlineLike
                                className={`inline-block ${
                                    like === -1
                                        ? "text-accent"
                                        : "text-transparent"
                                } stroke-accent`}
                                size="18"
                            />
                        </Button>
                    </div>
                </div>
                {/* <div className="flex flex-row justify-between w-full mt-2">
                    <SolidCaretRight
                        className="transform rotate-90"
                        size="20"
                    />
                </div> */}
            </div>
        </div>
    );
};
