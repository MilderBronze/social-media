import Image from "next/image"

export const ProfileCard = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-xs flex flex-col gap-6">
            <div className="h-20 relative">
                <Image
                    src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg"
                    fill
                    alt=""
                    className="object-cover rounded-md"
                />
                <Image
                    src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg"
                    alt=""
                    height={48}
                    width={48}
                    className="object-cover rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
                />
            </div>
            <div className="h-20 flex flex-col gap-2 items-center">
                <span className="font-semibold">milder</span>
                <div className="flex items-center gap-4">
                    <div className="flex">
                        <Image
                            src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg"
                            alt=""
                            height={12}
                            width={12}
                            className="object-cover rounded-full w-3 h-3"
                        />
                        <Image
                            src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg"
                            alt=""
                            height={12}
                            width={12}
                            className="object-cover rounded-full w-3 h-3"
                        />
                        <Image
                            src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg"
                            alt=""
                            height={12}
                            width={12}
                            className="object-cover rounded-full w-3 h-3"
                        />
                    </div>
                    <span className="text-xs text-gray-500">500 followers</span>
                </div>
                <button className="bg-blue-500 text-white text-xs p-2 rounded-md">My profile</button>
            </div>
        </div>
    )
}
