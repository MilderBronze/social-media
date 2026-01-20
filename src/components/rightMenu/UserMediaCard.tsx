import { User } from "@/generated/prisma/client"
import Image from "next/image"
import Link from "next/link"
import prisma from "../../../lib/prisma"

export default async function UserMediaCard({ user }: { user: User }) {

    const postsWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            img: {
                not: null
            }
        },
        take: 8,
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">User Media</span>
                <Link href={"/"} className="text-blue-500 text-xs" >
                    See all
                </Link>
            </div>
            {/* bottom */}
            <div className="flex gap-4 justify-between flex-wrap">
                { postsWithMedia.length ? 
                    postsWithMedia.map((post) => {
                        return (
                            <div key={post.id} className="relative w-1/5 h-24">
                                {/* <Image
                                    src={post}
                                    alt=""
                                    fill
                                    className="object-cover rounded-md"
                                /> */}
                            </div>
                        )
                    }) : ("no media found")
                }
            </div>
        </div>
    )
}