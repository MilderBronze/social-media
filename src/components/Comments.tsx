import Image from "next/image"

export default function Comments() {
    return (
        <div className="">
            {/* write */}
            <div className="flex items-center gap-4">

                <Image
                    src="https://images.pexels.com/photos/34922354/pexels-photo-34922354.jpeg" alt=""
                    height={32}
                    width={32}
                    className="w-8 h-8 rounded-full" />

                <div className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">

                    <input
                        type="text"
                        placeholder="Write a comment..."
                        className="bg-transparent outline-none flex-1" />

                    <Image
                        src="/emoji.png"
                        alt=""
                        height={16}
                        width={16}
                        className="cursor-pointer" />

                </div>
            </div>
            {/* comments */}
            <div className="">
                {/* comment */}
                <div className="flex gap-4 justify-evenly mt-6">
                    {/* avatar */}
                    <Image
                        src="https://images.pexels.com/photos/34922354/pexels-photo-34922354.jpeg" alt=""
                        height={40}
                        width={40}
                        className="w-10 h-10 rounded-full"
                    />
                    {/* description */}
                    <div className="flex flex-col gap-2 flex-1">
                        <span className="font-medium">milder</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ducimus aspernatur, hic vel libero perferendis, porro nesciunt corporis, cum impedit nobis ex consequuntur optio? Ullam possimus reprehenderit quisquam numquam ipsam!
                        </p>
                        <div className="flex items-center gap-8 text-sm text-gray-500 mt-2">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/like.png"
                                    alt=""
                                    height={12}
                                    width={12}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">123 likes</span>
                            </div>
                            <div className="">reply</div>
                        </div>
                    </div>
                    {/* icon */}
                    <Image
                        src="/more.png"
                        alt=""
                        height={16}
                        width={16}
                        className="w-4 h-4 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}