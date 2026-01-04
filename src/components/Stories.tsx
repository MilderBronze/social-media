import Image from "next/image"
export default function Stories() {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
            <div className="flex gap-8 w-max">
                {/* Stories */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                    <span className="font-medium">Ricky</span>
                </div>
                <div className="flex flex-col justify-between items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                    <span className="font-medium">Ricky</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                    <span className="font-medium">Ricky</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                    <span className="font-medium">Ricky</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image src="https://images.pexels.com/photos/34955547/pexels-photo-34955547.jpeg" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                    <span className="font-medium">Ricky</span>
                </div>
            </div>
        </div>
    )
}