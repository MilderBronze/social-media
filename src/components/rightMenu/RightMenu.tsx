import { User } from "@/generated/prisma/client";
import Ad from "../Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";

export default function RightMenu(prop: { user?: User }) {
    return (
        <div className="flex flex-col gap-6">
            {
                prop.user ? (
                    <>
                        <Suspense fallback="loading...">
                            <UserInfoCard user={prop.user} />
                        </Suspense>
                        <Suspense fallback="loading...">
                            <UserMediaCard user={prop.user} />
                        </Suspense>
                    </>
                ) : (
                    <div></div>
                )
            }
            <FriendRequests />
            <Birthdays />
            <Ad size="md" />
        </div>
    )
}