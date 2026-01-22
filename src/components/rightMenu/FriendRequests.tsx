import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import FriendRequestList from "./FriendRequestList";

export default async function FriendRequests() {

    const { userId } = await auth();
    if (!userId) {
        return null;
    }
    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: userId
        },
        include: {
            sender: true // inside our schema for follow request, we have sender using which we can retrieve all our information like profile pic in the follow request section
        }
    })
    if (requests.length === 0) return null;
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Friend Requests</span>
                <Link href={"/"} className="text-blue-500 text-xs" >See all</Link>
            </div>
            {/* user */}
            <FriendRequestList requests={requests}/>
        </div>
    )
}

// making network calls in this component is not good. for separation of concerns, moving the api calls to a new component called as FriendRequestList.tsx. This component shall live as a server component.