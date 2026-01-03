import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between h-24">
            {/* left */}
            <div className="block md:hidden lg:block w-[20%]">
                {/* myownstyles: block */}
                <Link href={"/"} className="font-bold text-xl text-blue-600">milder technologies</Link>
            </div>
            {/* center */}
            <div className="hidden md:flex">
                {/* links */}
                <div className="flex gap-6 text-gray-600">
                    <Link href={"/"} className="flex gap-2">
                        <Image src="/home.png" alt="Homepage" height={16} width={16} />
                        <span>Homepage</span>
                    </Link>
                    <Link href={"/"} className="flex gap-2">
                        <Image src="/friends.png" alt="Friends" height={16} width={16} />
                        <span>Friends</span>
                    </Link>
                    <Link href={"/"} className="flex gap-2">
                        <Image src="/stories.png" alt="Stories" height={16} width={16} />
                        <span>Stories</span>
                    </Link>
                </div>
            </div>
            {/* right */}
            <div className="">
                {/* this is gonna be a client side component because there is gonna be some user interaction with this one like clicking on the hamburger icon. */}
                <Link href={""}>
                    <MobileMenu />
                </Link>
            </div>
        </div>)
}