// everything inside this file is gonna run on the server.
// server actions baby!!!!

"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../../lib/prisma"

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = await auth()
    if (!currentUserId) {
        throw new Error("User is not authenticated")
    }
    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId
            }
        })

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id
                }
            })
        }
        else {
            // meaning ki agar already follow tha toh unfollow, else ho skta hai request sent hoga. agar request sent hua toh remove. and agar nai, toh create a new request.
            // follow ka code:
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId
                }
            })
            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id
                    }
                })
            }
            else {
                // create a new request:
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })
            }

        }
    } catch (error) {
        console.error(error)
    }
}

export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = await auth();
    if (!currentUserId) {
        throw new Error("User is not authenticated!");
    }
    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: userId
            }
        })
        if (existingBlock) {
            await prisma.block.delete({
                where: {
                    id: existingBlock.id
                }
            })
        }
        else {
            // create a new block
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId
                }
            })
        }
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
}