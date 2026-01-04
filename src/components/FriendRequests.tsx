import Link from "next/link";

export default function FriendRequests() {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm">
            {/* top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Friend Requests</span>
                <Link href={"/"} className="text-blue-500 text-xs" >See all</Link>
            </div>
            {/* bottom */}
            <div className=""></div>
        </div>
    )
}