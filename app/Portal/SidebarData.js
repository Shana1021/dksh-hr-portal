import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { FaBookReader } from "react-icons/fa"; //Training icon
import { BiSolidDashboard } from "react-icons/bi"; //Dashboard icon
import { BiNotepad } from "react-icons/bi"; //Onboarding
import { BiCalendarX } from "react-icons/bi"; //Offboarding
import { FaUserFriends } from "react-icons/fa"; //HR List
import { FaGear } from "react-icons/fa6"; //Settings

const sidebarData = [
  {
    title: "Profile",
    path: "#",
    icon: <FaUserCircle />,
  },
  {
    title: "Dashboard",
    path: "/Portal/Dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    title: "Onboarding",
    icon: <BiNotepad />,
    subnav: [
      {
        title: "Background Check",
        path: "/Portal/Onboarding-BackgroundCheck",
      },
      {
        title: "Checklist",
        path: "/Portal/Onboarding-Checklist",
      },
      {
        title: "Probationary",
        path: "#",
      },
    ],
  },
  {
    title: "Training",
    icon: <FaBookReader />,
    subnav: [
      {
        title: "Request Training",
        path: "/Portal/Training-RequestTraining",
      },
      {
        title: "Status Check",
        path: "/Portal/Training-StatusCheck",
      },
    ],
  },
  {
    title: "Offboarding",
    icon: <BiCalendarX />,
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
        path: "/Portal/Offboarding-Checklist",
      },
    ],
  },
  {
    title: "HR",
    icon: <FaUserFriends />,
    subnav: [
      {
        title: "HR-List",
        path: "/Portal/HR-List",
      },
      {
        title: "NewEmployee",
        path: "/Portal/NewEmployee",
      },
    ],
  },
  {
    title: "Settings",
    path: "/Portal/Settings",
    icon: <FaGear />,
  },
];
export default sidebarData;
