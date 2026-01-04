import Image from "next/image"

export default function AddPost() {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {/* avatar */}
            <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg/" alt="" height={48} width={48} className="w-12 h-12 object-cover rounded-full" />

            {/* post */}
            <div className="flex-1">
                {/* text input */}
                <div className="flex gap-4">
                    <textarea placeholder="What's on your mind?" className="bg-slate-100 rounded-lg flex-1 p-2"></textarea>
                    <Image src="/emoji.png" alt="" height={20} width={20} className="w-5 h-5 cursor-pointer self-end" />
                </div>
                {/* post options */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addimage.png" alt="" height={20} width={20} />
                        Photo
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addVideo.png" alt="" height={20} width={20} />
                        Video
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/poll.png" alt="" height={20} width={20} />
                        Poll
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/addevent.png" alt="" height={20} width={20} />
                        Event
                    </div>
                </div>
            </div>
        </div >
    )
}