import { MdEventAvailable } from "react-icons/md";
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
    name: "Upcoming Events",
    key: "upcomingEvents",
    icon: <MdEventNote className="w-5 h-5" />,
  },

  {
    name: "Registered Events",
    key: "registeredEvents",
    icon: <MdEventAvailable className="w-5 h-5" />,
  },

  {
    name: "Ranking Board",
    key: "rankingBoard",
    icon: <PiRankingBold className="w-5 h-5" />,
  },
  {
    name: "Ranking Approval",
    key: "rankingApproval",
    icon: <MdLibraryAddCheck className="w-5 h-5" />,
  },
];
