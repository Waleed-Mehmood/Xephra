import { MdEventAvailable, MdSportsEsports } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { PiRankingBold } from "react-icons/pi";
import { MdLibraryAddCheck } from "react-icons/md";

export const menuItems = [
  {
    name: "Dashboard",
    key: "dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Posted Events",
    key: "postedEvents",
    icon: <MdEventNote className="w-5 h-5" />,
  },

  {
    name: "New Events",
    key: "newEvents",
    icon: <MdEventAvailable className="w-5 h-5" />,
  },

  {
    name: "User Ranking",
    key: "userRanking",
    icon: <PiRankingBold className="w-5 h-5" />,
  },
  {
    name: "Completed Events",
    key: "CompletedEvents",
    icon: <MdSportsEsports className="w-5 h-5" />,
  },
  {
    name: "Ranking Approval",
    key: "rankingApproval",
    icon: <MdLibraryAddCheck className="w-5 h-5" />,
  },
];
