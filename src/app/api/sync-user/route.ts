import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }

        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (userExists) {
            return new Response(
                JSON.stringify({ message: "User already exists", userId, username: userExists.username }),
                { status: 200 }
            );
        }

        // If user doesn't exist, create them
        const newUser = await prisma.user.create({
            data: {
                id: userId,
                username: `user_${Date.now()}`, // Temporary username
                avatar: "/noAvatar.png",
                cover: "/noCover.png",
            }
        });

        return new Response(
            JSON.stringify({ message: "User synced successfully", userId, username: newUser.username }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Sync user error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to sync user" }),
            { status: 500 }
        );
    }
}
