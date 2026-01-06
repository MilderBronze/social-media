import Image from "next/image"
import Link from "next/link"

export default function UserInfoCard({ userId }: { userId: string }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* top */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">User Information</span>
                <Link href={"/"} className="text-blue-500 text-xs" >
                    See all
                </Link>
            </div>
            {/* bottom */}
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center">
                    <span className="text-xl text-black">milder</span>
                    <span className="text-sm">@milder</span>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint consectetur dolor ab. Dolorum, ducimus? Sint voluptas repellendus veritatis, quas impedit quaerat incidunt temporibus tempore eligendi atque quos inventore. Autem, a?
                </p>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" height={16} width={16} className="" />
                    <span>Living in <b>Bangalore</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/school.png" alt="" height={16} width={16} className="" />
                    <span>Went to <b>Delhi Public School</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/work.png" alt="" height={16} width={16} className="" />
                    <span>Works at <b>Google LLC</b></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                        <Image src="/link.png" alt="" height={16} width={16} className="" />
                        <Link href={"https://www.github.com/MilderBronze"} className=" text-blue-500 font-medium">
                            milder.dev
                        </Link>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Image src="/date.png" alt="" height={16} width={16} className="" />
                        <span>Joined November 2025</span>
                    </div>
                </div>
                <button className="bg-blue-500 text-white text-sm rounded-md p-2">Follow</button>
                <span className="text-red-400 self-end text-xs cursor-pointer">Block User</span>
            </div>
        </div>
    )
}