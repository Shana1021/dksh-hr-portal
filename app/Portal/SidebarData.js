import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon   
import { FaRegChartBar } from "react-icons/fa"; // Dashboard icon
import { FaBookReader } from "react-icons/fa"; // Training icon
import { BiNotepad } from "react-icons/bi"; //  Onboarding
import { BiCalendarX } from "react-icons/bi"; // Offboarding
import { FaUserFriends } from "react-icons/fa"; // HR List
import { FaGear } from "react-icons/fa6"; // Settings
import { FaLockOpen } from "react-icons/fa6"; //Log Out icon

export const SidebarData = [
  {
    title: "Profile",
    path: "/Portal/HR-List", 
    icon: <FaUserCircle className="icon profile-icon" />, 
  },
  {
    title: "Dashboard",
    path: "/Portal/Dashboard",
    icon: <FaRegChartBar className="icon" />,
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
    path: "#",
    icon: <FaUserFriends className="icon" />,
  },
  {
    title: "Settings",
    path: "#",
    icon: <FaGear className="icon" />,
  },
  {
    title: "Log Out",
    path: "/Login",
    icon: <FaLockOpen className="icon" />,
  },
];