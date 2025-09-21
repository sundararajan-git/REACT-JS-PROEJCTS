import * as React from "react";
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
} from "@tabler/icons-react";

import { HiOutlineCalendarDays } from "react-icons/hi2";
import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { FiActivity } from "react-icons/fi";
import { LuMessageCircleCode } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiCoins } from "react-icons/pi";
import { RiBillLine } from "react-icons/ri";
import { LuContact } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RiUserCommunityLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

import { NavDocuments } from "@/components/NavDocuments";
import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GiHospitalCross } from "react-icons/gi";

export const AppSidebar = ({ ...props }) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <GiHospitalCross className="!size-5" />
                <span className="text-base font-semibold">ADASH .</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

const data = {
  user: {
    name: "Sundararajan",
    email: "sundar@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Calendar",
      url: "#",
      icon: <HiOutlineCalendarDays />,
    },
    {
      title: "Teams",
      url: "#",
      icon: <PiMicrosoftTeamsLogo />,
    },
    {
      title: "Activity",
      url: "#",
      icon: <FiActivity />,
    },
    {
      title: "Message",
      url: "#",
      icon: <LuMessageCircleCode />,
    },
    {
      title: "Report",
      url: "#",
      icon: <HiOutlineDocumentReport />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <IoSettingsOutline />,
    },
    {
      title: "User Management",
      url: "#",
      icon: <RiUserCommunityLine />,
    },
    {
      title: "Help & Support",
      url: "#",
      icon: <BiSupport />,
    },
  ],
  documents: [
    {
      name: "Payroll",
      url: "#",
      icon: <PiCoins />,
    },
    {
      name: "Billing",
      url: "#",
      icon: <RiBillLine />,
    },
    {
      name: "Contact",
      url: "#",
      icon: <LuContact />,
    },
  ],
};
