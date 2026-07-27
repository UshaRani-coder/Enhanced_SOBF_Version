
import { FiTarget } from "react-icons/fi";
import { IoDocuments } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { RiAdminFill, RiServiceFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import {
  FaUsers,
  FaPen,
  FaTable,
  FaYoutube,
  FaRegNewspaper,
} from "react-icons/fa";

export const sidebarItems = [
  {
    title: "Team Members",
    path: "/dashboard",
    icon: RiAdminFill,
    iconClassName: "text-xl",
  },
  {
    title: "Hero Banner",
    path: "/hero-banner",
    icon: FaTable,
    iconClassName: "text-lg",
  },
  {
    title: "Our Impacts",
    path: "/our-impacts",
    icon: FiTarget,
    iconClassName: "text-xl",
  },
  {
    title: "Featured Videos",
    path: "/featured-videos",
    icon: FaYoutube,
    iconClassName: "text-lg",
  },
  {
    title: "Legal Documents",
    path: "/legalDoc",
    icon: IoDocuments,
    iconClassName: "text-lg",
  },
  {
    title: "Recent Activities",
    path: "/recent-activities",
    icon: FaPen,
    iconClassName: "text-xl",
  },
  {
    title: "News Bulletins",
    path: "/bulletine",
    icon: FaRegNewspaper,
    iconClassName: "text-lg",
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: GrGallery,
    iconClassName: "text-lg",
  },
  {
    title: "Our Services",
    path: "/our-services",
    icon: RiServiceFill,
    iconClassName: "text-xl",
  },
  {
    title: "Volunteer",
    path: "/volunteer",
    icon: FaUsers,
    iconClassName: "text-lg",
  },
  {
    title: "Donate For",
    path: "/donate-for",
    icon: FaUsers,
    iconClassName: "text-lg",
  },
  {
    title: "Subscribed Donor",
    path: "/subscribed-donors",
    icon: FaUsers,
    iconClassName: "text-lg",
  },
  {
    title: "Donor Info",
    path: "/donors",
    icon: FaUsers,
    iconClassName: "text-lg",
  },
];

export const upcomingEventItems = [
  {
    title: "Upcoming Events",
    path: "/upcoming-events",
    icon: SlCalender,
    iconClassName: "text-lg",
  },
  {
    title: "Registered Users",
    path: "/upcoming-events/registered-users",
    icon: FaUsers,
    iconClassName: "text-lg",
  },
];