"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconPin,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";

import { motion } from "framer-motion";
import SlimIcon from "../slim-icon";
import { Button } from "@/components/ui/button";

const SideBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  return (
    <Sidebar open={open} setOpen={setOpen} animate={animate}>
      <SidebarBody className="justify-between gap-10 h-svh bg-zinc-50 dark:bg-zinc-900">
        <div className="flex justify-between items-center">
          {open || !animate ? <Logo /> : <LogoIcon />}
          {open && (
            <div
              className="dark:hover:text-zinc-400 hover:text-zinc-600 text-zinc-500"
              onClick={() => setAnimate(!animate)}
            >
              <IconPin className="w-4 h-4 " />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};
export default SideBar;

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 h-8"
    >
      <SlimIcon />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-black dark:text-white whitespace-pre"
      >
        SLIM
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 h-8"
    >
      <SlimIcon />
    </Link>
  );
};
