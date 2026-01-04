import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

export default function RightMenu(prop: { userId?: string }) {
    return (
        <div className="flex flex-col gap-6">
            {/* 3 components: friend requests, birthdays, sponsored ads */}
            {/* but for profile page, we have 2 more cards: user information and the user media (saved media, uploaded media, archived media etc.) SO, for different pages, different number of items. */}
            {/* thus, get the type of the page as prop. If we get userId from the url as searchparams, then it means we are on the profile page. */}

            {/* ------------------------------------------------------------------------- */}
            <FriendRequests />
            <Birthdays />
            <Ad size="md" />
        </div>
    )
}