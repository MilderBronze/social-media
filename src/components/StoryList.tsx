"use client";

import { Story, User } from "@/generated/prisma/client";
import { addStory } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryWithUser = Story & {
    user: User;
};

const StoryList = ({
    stories,
    userId,
}: {
    stories: StoryWithUser[];
    userId: string;
}) => {
    const [storyList, setStoryList] = useState(stories);
    const [img, setImg] = useState<any>();
    const [selectedStory, setSelectedStory] = useState<StoryWithUser | null>(null);

    const { user, isLoaded } = useUser();

    const add = async () => {
        if (!img?.secure_url) return;

        addOptimisticStory({
            id: Math.random(),
            img: img.secure_url,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            userId: userId,
            user: {
                id: userId,
                username: "Sending...",
                avatar: user?.imageUrl || "/noAvatar.png",
                cover: "",
                description: "",
                name: "",
                surname: "",
                city: "",
                work: "",
                school: "",
                website: "",
                createdAt: new Date(Date.now()),
            },
        });

        try {
            const createdStory = await addStory(img.secure_url);
            setStoryList((prev) => [createdStory!, ...prev]);
            setImg(null)
        } catch (err) { }
    };

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyList,
        (state, value: StoryWithUser) => [value, ...state]
    );
    return (
        <>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result, { widget }) => {
                    setImg(result.info);
                    widget.close();
                }}
            >
                {({ open }) => {
                    return (
                        <div className="flex flex-col items-center gap-2 cursor-pointer relative">
                            <Image
                                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                                alt=""
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full ring-2 object-cover"
                                onClick={() => open()}
                            />
                            {img ? (
                                <form action={add}>
                                    <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                                        Send
                                    </button>
                                </form>
                            ) : (
                                <span className="font-medium">Add a Story</span>
                            )}
                            <div className="absolute text-6xl text-gray-200 top-1">+</div>
                        </div>
                    );
                }}
            </CldUploadWidget>
            {/* STORY */}
            {optimisticStories.map((story) => (
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-75 transition"
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                >
                    <Image
                        src={story.user.avatar || "/noAvatar.png"}
                        alt=""
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full ring-2"
                    />
                    <span className="font-medium text-xs">
                        {story.user.name || story.user.username}
                    </span>
                </div>
            ))}

            {/* STORY VIEWER MODAL */}
            {selectedStory && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedStory(null)}
                >
                    <div className="relative max-w-md w-full max-h-screen flex flex-col">
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-2 mb-4 bg-gray-900 bg-opacity-50 p-3 rounded-t-lg">
                            <Image
                                src={selectedStory.user.avatar || "/noAvatar.png"}
                                alt=""
                                width={36}
                                height={36}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <span className="text-white font-medium text-sm">
                                {selectedStory.user.name || selectedStory.user.username}
                            </span>
                        </div>

                        <Image
                            src={selectedStory.img || ""}
                            alt="Story"
                            width={400}
                            height={600}
                            className="w-full h-auto object-cover rounded-b-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default StoryList;
