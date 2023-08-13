import React from "react";
import { FaRegChartBar } from "react-icons/fa"; //Dashboard Icon
import { FaBookReader } from "react-icons/fa"; //Training icon
import { BiSolidDashboard } from "react-icons/bi"; //optional for Dashboard icon
import { BiNotepad } from "react-icons/bi"; //Onboarding
import { BiCalendarX } from "react-icons/bi"; //Offboarding
import { FaUserFriends } from "react-icons/fa"; //HR List
import { FaGear } from "react-icons/fa6"; //Settings
export const SidebarData = [
  {
    title: "Dashboard",
    path: "#",
    icon: <FaRegChartBar className="icon" />,
  },
  {
    title: "Onboarding",
    path: "#",
    icon: <BiNotepad className="icon" />,
    subnav: [
      {
        title: "Background Check",
        path: "#",
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
];
