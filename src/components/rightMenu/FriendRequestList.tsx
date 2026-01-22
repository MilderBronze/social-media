"use client"
import React, { useOptimistic, useState } from 'react'
import Image from 'next/image'
import { FollowRequest, User } from '@/generated/prisma/client'
import { acceptFollowRequest, declineFollowRequest } from '@/lib/action'

type RequestWithUser = FollowRequest & {
    sender: User
}
// since you are including sender in request in FriendRequests.tsx component, hence, you must create this type and have sender in it.

/**
 * The above type corresponds to this if you hover over it:

type RequestWithUser = {
    id: number;
    createdAt: Date;
    senderId: string;
    receiverId: string;
} & {
    sender: {
        id: string;
        createdAt: Date;
        name: string | null;
        username: string;
        avatar: string | null;
        cover: string | null;
        surname: string | null;
        description: string | null;
        work: string | null;
        website: string | null;
        school: string | null;
        city: string | null;
    };
}

ye krne se typesafety toh rahegi hii so that any developer fail to access anything outside of the scope sender (User) and FollowRequest. Plus, intellisense toh rhega hii.
 */

function FriendRequestList({ requests }: { requests: RequestWithUser[] }) {
    const [requestState, setRequestState] = useState(requests);
    const accept = async (requestId: number, userId: string) => {
        removeOptimisticsRequests(requestId)
        try {
            await acceptFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch (error) {
            console.error(error)
        }
    }
    const decline = async (requestId: number, userId: string) => {
        removeOptimisticsRequests(requestId)
        try {
            await declineFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch (error) {
            console.error(error)
        }
    }
    const [optimisticRequests, removeOptimisticsRequests] = useOptimistic(requestState, (state, value: number) => {
        return state.filter(req => req.id !== value);
    })
    return (
        <div>
            {optimisticRequests.map((request) => (
                <div className="flex items-center justify-between" key={request.id}>
                    <div className="flex items-center gap-4">
                        <Image
                            src={request.sender.avatar || "/noAvatar.png"}
                            alt={request.sender.name || request.sender.username}
                            height={40}
                            width={40}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="font-semibold">{request.sender.name && request.sender.surname ? request.sender.name + " " + request.sender.surname : request.sender.username}</span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <form action={() => accept(request.id, request.sender.id)}>
                            <button>
                                <Image src="/accept.png" alt="Accept" height={20} width={20} className="cursor-pointer" />
                            </button>
                        </form>
                        <form action={() => decline(request.id, request.sender.id)}>
                            <button>
                                <Image src="/reject.png" alt="Reject" height={20} width={20} className="cursor-pointer" />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FriendRequestList