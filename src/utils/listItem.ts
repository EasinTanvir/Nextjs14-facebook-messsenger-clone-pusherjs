import { GoHome } from "react-icons/go";
import { MdOndemandVideo } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { RiMemoriesLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { LiaVideoSolid } from "react-icons/lia";
import { MdEmojiEvents } from "react-icons/md";
import { MdOutlineFeed } from "react-icons/md";
export const ListItesm = [
  { id: 1, Icon: GoHome, label: "Home", href: "/" },
  { id: 1, Icon: FaUserFriends, label: "Friend", href: "/friends" },
  { id: 2, Icon: MdOndemandVideo, label: "Video", href: "/" },
  { id: 4, Icon: CgGames, label: "Games", href: "/" },
];
export const SideBarItems = [
  { id: 1, Icon: FaUserFriends, label: "Friends" },
  { id: 2, Icon: RiMemoriesLine, label: "Memories" },
  { id: 3, Icon: MdGroups, label: "Groups" },
  { id: 4, Icon: LiaVideoSolid, label: "Videos" },
  { id: 5, Icon: FaLandmark, label: "Marketplace" },
  { id: 6, Icon: CgGames, label: "Games" },
  { id: 6, Icon: MdEmojiEvents, label: "Events" },
  { id: 6, Icon: MdOutlineFeed, label: "Feeds" },
];

export const profileItems = [
  { id: 2, label: "Profile", href: "/user/profile" },
  { id: 3, label: "Messenger", href: "/messenger" },
];
