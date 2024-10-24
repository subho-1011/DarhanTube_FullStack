import {
    Clock,
    HomeIcon,
    PlaySquare,
    ThumbsUpIcon,
    Tv2Icon,
    User2Icon,
    Users2Icon,
} from "lucide-react";

const NavItems = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
    {
        title: "Community",
        url: "/community-posts",
        icon: Users2Icon,
    },
    {
        title: "Playlists",
        url: "/playlists",
        icon: PlaySquare,
    },
    {
        title: "Watch History",
        url: "/watch-history",
        icon: Clock,
    },
    {
        title: "Liked Videos",
        url: "/liked-videos",
        icon: ThumbsUpIcon,
    },
    {
        title: "Dashboard",
        url: "/channel/@me",
        icon: Tv2Icon,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User2Icon,
    },
];

export { NavItems };
