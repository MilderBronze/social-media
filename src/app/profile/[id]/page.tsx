import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";

export default function ProfilePage() {
    return (
        <div className='flex gap-6 pt-6'>
            <div className="hidden xl:block w-[20%]">
                <LeftMenu type="profile" />
            </div> {/* the left, middle and the right containers, center appears at all times, right appears at large, left appears at xl according to the appropriate design of this project */}
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-64 relative">
                            <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" fill className="rounded-md object-cover" alt="" />
                            <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" width={128} height={128} className="absolute rounded-full object-cover w-32 h-32 left-0 right-0 ring-4 ring-white m-auto -bottom-16" alt="" />
                        </div>
                        <h1 className="mt-20 mb-4 text-2xl font-medium">MilderBronze</h1>
                        <div className="flex items-center justify-center gap-12 mb-4">
                            <div className="flex flex-col items-center">
                                <span className="font-medium">123</span>
                                <span className="text-sm">Posts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">1.2k</span>
                                <span className="text-sm">Followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">1.3k</span>
                                <span className="text-sm">Following</span>
                            </div>
                        </div>
                    </div>
                    <Feed />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]">
                <RightMenu userId="test" />
            </div>
        </div>
    )
} 