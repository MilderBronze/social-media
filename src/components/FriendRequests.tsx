import Link from "next/link";
import Image from "next/image";

export default function FriendRequests() {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Friend Requests</span>
                <Link href={"/"} className="text-blue-500 text-xs" >See all</Link>
            </div>
            {/* user */}
            <div className="flex items-center justify-center">
                <div className="">
                    <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg/" alt="" height={40} width={40} className="h-10 w-10 rounded-full object-cover" />
                    <span>milder</span>
                </div>
                <div className="">
                    <Image src="/accept.png" alt="" height={40} width={40} className="h-10 w-10 rounded-full object-cover" />
                    <Image src="/reject.png" alt="" height={40} width={40} className="h-10 w-10 rounded-full object-cover" />
                </div>
            </div>
        </div>
    )
}