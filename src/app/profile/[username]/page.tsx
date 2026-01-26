import RightMenu from "@/components/rightMenu/RightMenu";
import Image from "next/image";
import prisma from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import Feed from "@/components/feed/Feed";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params; // folder name was [username] toh yaha bhi username extract kro. 
    const user = await prisma.user.findFirst({
        where: {
            username
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    followings: true,
                    posts: true
                }
            }
        }
    })
    if (!user) return notFound();
    // if we are blocked, we should not see the user page.
    const { userId: currentUserId } = await auth();

    let isBlocked;
    if (currentUserId) {
        const res = await prisma.block.findFirst({
            where: {
                blockerId: user.id,
                blockedId: currentUserId
            }
        })
        if (res) isBlocked = true
    }
    else {
        isBlocked = false
    }
    if (isBlocked) {
        return notFound();
    }




    if (!user) return notFound()
    return (
        <div className='flex gap-6 pt-6'>
            <div className="hidden xl:block w-[20%]">
                <LeftMenu type="profile" />
            </div> {/* the left, middle and the right containers, center appears at all times, right appears at large, left appears at xl according to the appropriate design of this project */}
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-64 relative">
                            <Image src={user.cover || "/noCover.png"} fill className="rounded-md object-cover" alt="" />
                            <Image src={user.avatar || "/noAvatar.png"} width={128} height={128} className="absolute rounded-full object-cover w-32 h-32 left-0 right-0 ring-4 ring-white m-auto -bottom-16" alt="" />
                        </div>
                        <h1 className="mt-20 mb-4 text-2xl font-medium">
                            {(user.name && user.surname)
                                ? (user.name + " " + user.surname)
                                : (user.username)}
                        </h1>
                        <div className="flex items-center justify-center gap-12 mb-4">
                            <div className="flex flex-col items-center">
                                <span className="font-medium">{user._count.posts + " "}</span>
                                <span className="text-sm">Posts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">{user._count.followers + " "}</span>
                                <span className="text-sm">Followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">{user._count.followings + " "}</span>
                                <span className="text-sm">Following</span>
                            </div>
                        </div>
                    </div>
                    <Feed />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]">
                <RightMenu user={user} />
            </div>
        </div>
    )
} 