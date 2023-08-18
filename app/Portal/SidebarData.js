import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { FaBookReader } from "react-icons/fa"; //Training icon
import { BiSolidDashboard } from "react-icons/bi"; //Dashboard icon
import { BiNotepad } from "react-icons/bi"; //Onboarding
import { BiCalendarX } from "react-icons/bi"; //Offboarding
import { FaUserFriends } from "react-icons/fa"; //HR List
import { FaGear } from "react-icons/fa6"; //Settings
import { BiLogOut } from "react-icons/bi"; //Log out

const sidebarData = [
  {
    title: "Profile",
    path: "#",
    icon: <FaUserCircle className="icon profile-icon" />,
  },
  {
    title: "Dashboard",
    path: "/Portal/Dashboard",
    icon: <BiSolidDashboard className="icon" />,
  },
  {
    title: "Onboarding",
    path: "#",
    icon: <BiNotepad className="icon" />,
    subnav: [
      {
        title: "Background Check",
        path: "/Portal/Onboarding-BackgroundCheck",
      },
      {
        title: "Checklist",
        path: "#",
      },
      {
        title: "Probationary",
        path: "#",
      },
    ],
  },
  {
    title: "Training",
    path: "#",
    icon: <FaBookReader className="icon" />,
    subnav: [
      {
        title: "Request Training",
        path: "#",
      },
      {
        title: "Status Check",
        path: "#",
      },
    ],
  },
  {
    title: "Offboarding",
    path: "#",
    icon: <BiCalendarX className="icon" />,
    subnav: [
      {
        title: "Request for Resignation",
        path: "#",
      },
      {
        title: "Resignation Requests",
        path: "#",
      },
      {
        title: "Checklist",
        path: "#",
      },
    ],
  },
  {
    title: "HR List",
    path: "/Portal/HR-List",
    icon: <FaUserFriends className="icon" />,
  },
  {
    title: "Settings",
    path: "/Portal/Settings",
    icon: <FaGear className="icon" />,
  },
  {
    title: "Log out",
    path: "/Login",
    icon: <BiLogOut />,
  },
];

export default sidebarData;