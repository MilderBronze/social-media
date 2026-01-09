"use client"

import { switchFollow } from "@/lib/action"
import { useOptimistic, useState } from "react"

function UserInfoCardInteraction(
    {
        userId,
        currentUserId,
        isUserBlocked,
        isFollowing,
        isFollowRequestSent
    }: {
        userId: string,
        currentUserId: string,
        isUserBlocked: boolean,
        isFollowing: boolean,
        isFollowRequestSent: boolean
    }) {

    const [userState, setUserState] = useState({
        blocked: isUserBlocked,
        following: isFollowing,
        followingRequestSent: isFollowRequestSent,
    })

    const follow = async () => {
        switchOptimisticFollow(
            {
                isUserBlocked,
                isFollowing: !isFollowing,
                followingRequestSent: !isFollowRequestSent
            }
        )
        try {
            await switchFollow(userId);

            setUserState(prev => ({
                ...prev,
                isFollowing: isFollowing && false,
                followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false
            }))
        } catch (error) {
            console.error(error)
        }
    };

    const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
        userState,
        (state, newValue) => ({
            ...state,
            isFollowing: isFollowing && false,
            followingRequestSent: !state.following && !state.followingRequestSent ? true : false
        })
    )

    return (
        <>
            <form action={follow}>
                <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
                    {
                        optimisticFollow.followingRequestSent
                            ? "Request Sent"
                            : (optimisticFollow.following ? "Following" : "Follow")
                    }
                </button>
            </form>
            <form action="" className="self-end">
                <span className="text-red-400 text-xs cursor-pointer">{optimisticFollow.blocked ? "Unblock user" : "Block"}</span>
            </form>
        </>
    )
}

export default UserInfoCardInteraction