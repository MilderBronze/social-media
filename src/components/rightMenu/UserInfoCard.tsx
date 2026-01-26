import { User } from "@/generated/prisma/client"
import { auth } from "@clerk/nextjs/server";
import Image from "next/image"
import Link from "next/link"
import prisma from "../../../lib/prisma";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

export default async function UserInfoCard({ user }: { user: User }) {

    const createdAtDate = new Date(user.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
        year: "numeric", // Display full year (e.g., "2025")
        month: "long", // Display full month name (e.g., "January")
        day: "numeric" // Display day as number (e.g., "8")
        // Eg:
        // If user.createdAt was 2025-01-08, the formatted result would be: "January 8, 2025"
    })

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowRequestSent = false;

    const { userId: currentUserId } = await auth();

    if (!currentUserId) return;

    // and user is passed from username in path via rightmenu component.
    const userIdFromPathUrl = user.id;

    const blockRes = await prisma.block.findFirst({
        where: {
            blockerId: currentUserId,
            blockedId: userIdFromPathUrl
        }
    })
    isUserBlocked = blockRes ? true : false;

    const followRes = await prisma.follower.findFirst({
        where: {
            followerId: currentUserId,
            followingId: userIdFromPathUrl
        }
    })
    isFollowing = followRes ? true : false;

    const followRequestRes = await prisma.followRequest.findFirst({
        where: {
            senderId: currentUserId,
            receiverId: userIdFromPathUrl
        }
    })
    isUserBlocked = followRequestRes ? true : false;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">User Information</span>
                {currentUserId === user.id ? (<UpdateUser user={user}/>) : (<Link href='/' className='text-blue-500 text-xs'>See all</Link>)}
            </div>
            {/* bottom */}
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-black">
                        {(user.name && user.surname) ? (user.name + " " + user.surname) : (user.username)}
                    </span>
                    <span className="text-sm">@{user.username}</span>
                </div>
                {user.description &&
                    <p>
                        {user.description}
                    </p>
                }
                {
                    user.city &&
                    <div className="flex items-center gap-2">
                        <Image src="/map.png" alt="" height={16} width={16} className="" />
                        <span>Living in <b>{user.city}</b></span>
                    </div>
                }
                {
                    user.school &&
                    <div className="flex items-center gap-2">
                        <Image src="/school.png" alt="" height={16} width={16} className="" />
                        <span>Went to <b>{user.school}</b></span>
                    </div>
                }
                {
                    // user.work &&
                    <div className="flex items-center gap-2">
                        <Image src="/work.png" alt="" height={16} width={16} className="" />
                        <span>Works at <b>{user.work ?? "Google LLC"}</b></span>
                    </div>
                }
                <div className="flex items-center justify-between">
                    {
                        user.website &&
                        <div className="flex gap-1 items-center">
                            <Image src="/link.png" alt="" height={16} width={16} className="" />
                            <Link href={user.website} className=" text-blue-500 font-medium">
                                {user.website}
                            </Link>
                        </div>
                    }
                    <div className="flex gap-1 items-center">
                        <Image src="/date.png" alt="" height={16} width={16} className="" />
                        <span>Joined {formattedDate}</span>
                    </div>
                </div>
                {currentUserId && currentUserId !== user.id && <UserInfoCardInteraction
                    userId={user.id}
                    isUserBlocked={isUserBlocked}
                    isFollowing={isFollowing}
                    isFollowingSent={isFollowRequestSent}
                />}
            </div>
        </div >
    )
}