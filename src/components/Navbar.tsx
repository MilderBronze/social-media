'use client'

import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between h-24">
            {/* left */}
            <div className="block md:hidden xl:block w-[10%]">
                {/* myownstyles: block */}
                <Link href={"/"} className="font-bold text-xl text-blue-600">milder</Link>
            </div>
            {/* center */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
                {/* links */}
                <div className="flex gap-6 text-gray-600">
                    <Link href={"/"} className="flex items-center gap-2">
                        <Image src="/home.png" alt="Homepage" height={16} width={16} className="w-4 h-4" />
                        <span>Homepage</span>
                    </Link>
                    <Link href={"/"} className="flex items-center gap-2">
                        <Image src="/friends.png" alt="Friends" height={16} width={16} className="w-4 h-4" />
                        <span>Friends</span>
                    </Link>
                    <Link href={"/"} className="flex items-center gap-2">
                        <Image src="/stories.png" alt="Stories" height={16} width={16} className="w-4 h-4" />
                        <span>Stories</span>
                    </Link>
                </div>
                <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-md">
                    <input type="text" placeholder="search..." className="bg-transparent outline-none" />
                    <Image src={"/search.png"} alt="" width={14} height={14} />
                </div>
            </div>
            {/* right */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                {/* this is gonna be a client side component because there is gonna be some user interaction with this one like clicking on the hamburger icon. */}
                <ClerkLoading>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface dark:text-white"
                        role="status"
                        aria-label="loading"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                    {/* we are gonna see 3 states over here: first is loading, second is if user is not authenticated, login/signup, else our icons */}
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                            <Image src="/people.png" alt="" width={24} height={24} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/messages.png" alt="" width={20} height={20} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/notifications.png" alt="" width={20} height={20} className="" />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Image src="/login.png" alt="" width={20} height={20} />
                            <Link href={"/sign-in"}>Login/register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>)
}