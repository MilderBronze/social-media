import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "../../../lib/prisma";

const Feed = async ({ username }: { username?: string }) => {
    const { userId } = await auth();

    console.log("Feed rendering - userId:", userId, "username:", username);

    let posts: any[] = [];

    if (username) {
        console.log("Fetching posts for username:", username);
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: username,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                /**
                 * 
                 * // Returns:
                    [
                        { userId: "user_123" },
                        { userId: "user_456" },
                        ...
                    ]
                 */
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    if (!username && userId) {
        console.log("Fetching home feed posts for userId:", userId);
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId,
            },
            select: {
                followingId: true,
            },
        });

        const followingIds = following.map((f) => f.followingId);
        // the array contains all the following ids only. no keys. only values. simple.
        const ids = [userId, ...followingIds]
        console.log("Fetching posts from userIds:", ids);

        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: ids,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true, // agar directly user: true ki tarah likes: true kr dete toh sara information aa jata uss table ke sare rows ka.. isliye sirf userId select krke laa rhe hai because just vhi needed hai.
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc", // latest posts pehle dekhne ke liye descending order.
            },
        });
    }
    console.log("Feed fetched posts count:", posts.length, "with likes:", posts.map(p => ({ postId: p.id, likeCount: p.likes.length })));
    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
            {posts.length ? (posts.map(post => (
                <Post key={post.id} post={post} />
            ))) : "No posts found!"}
        </div>
    );
};

export default Feed;
