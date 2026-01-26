import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

const userData: Prisma.UserCreateInput[] = [
    {
        id: "seed_alice",
        username: "alice",
        name: "Alice",
        posts: {
            create: [
                {
                    desc: "Join the Prisma Discord",
                    img: "https://pris.ly/discord",
                },
                {
                    desc: "Prisma on YouTube",
                    img: "https://pris.ly/youtube",
                },
            ],
        },
    },
    {
        id: "seed_bob",
        username: "bob",
        name: "Bob",
        posts: {
            create: [
                {
                    desc: "Follow Prisma on Twitter",
                    img: "https://www.twitter.com/prisma",
                },
            ],
        },
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
}

main();