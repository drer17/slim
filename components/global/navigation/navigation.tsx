/*
 * Navigation Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [x]- Side bar navigation
 * [x]- Mobile support
 */

"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import { IconPin } from "@tabler/icons-react";
import Link from "next/link";

import { motion } from "framer-motion";
import SlimIcon from "../slim-icon";
import { coreLinks, links } from "./data";
import { cn } from "@/lib/utils";

interface NavigationProps {
  mobileHeader?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ mobileHeader }) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  return (
    <Sidebar open={open} setOpen={setOpen} animate={animate}>
      <SidebarBody
        className="justify-between gap-10 h-svh bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur group"
        mobileHeader={mobileHeader}
      >
        <div className="flex justify-between items-center">
          {open || !animate ? <Logo /> : <LogoIcon />}
          {open && (
            <div
              className="dark:hover:text-zinc-400 hover:text-zinc-600 text-zinc-500 invisible md:visible"
              onClick={() => setAnimate(!animate)}
            >
              <IconPin className="w-4 h-4 " />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} className={link.class} />
            ))}
          </div>
          <p
            className={cn(
              "uppercase font-medium text-zinc-500 text-sm mt-10 mb-4 group-hover:visible invisible duration-100 ease-in-out",
              !animate ? "visible" : "invisible",
            )}
          >
            core
          </p>
          <div className="flex flex-col gap-2">
            {coreLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} className={link.class} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default Navigation;

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
