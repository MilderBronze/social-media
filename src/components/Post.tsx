import Image from "next/image";

const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* USER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src="https://images.pexels.com/photos/34922354/pexels-photo-34922354.jpeg"
                        width={40}
                        height={40}
                        alt=""
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">milder</span>
                </div>
                <Image src="/more.png" width={16} height={16} alt="" />
            </div>

            {/* DESC */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image src="https://images.pexels.com/photos/34922354/pexels-photo-34922354.jpeg" fill className="object-cover rounded-md" alt="" />
                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea id natus eius blanditiis rem, obcaecati cupiditate odit accusantium excepturi voluptatibus distinctio deserunt vitae eveniet voluptatum sint placeat soluta molestiae fugiat!</p>
            </div>

            {/* INTERACTION */}
            <div className=""></div>
        </div>
    );
};

export default Post;
