"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/generic/Logo";
import { ModeToggle } from "../modetoggle/ModeToggle";
import { MobileDrawer } from "./MobileDrawer";
import { Navs } from "./Navs";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries/types";
import RobotFollowToggle from "../robot-companion/RobotFollowToggle";
import { usePathname } from "next/navigation";

const Header = ({ dictionary }: { dictionary: Dictionary["common"] }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setIsExpanded(true);
      lastScrollY.current = window.scrollY;
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pathname]);

  useEffect(() => {
    const revealAtTop = 24;
    const hideAfter = 96;
    const directionThreshold = 8;

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const distance = currentScrollY - lastScrollY.current;
      const distanceToBottom =
        document.documentElement.scrollHeight - (currentScrollY + window.innerHeight);

      if (currentScrollY <= revealAtTop || distanceToBottom <= 32) {
        setIsExpanded(true);
        lastScrollY.current = currentScrollY;
      } else if (distance > directionThreshold && currentScrollY > hideAfter) {
        setIsExpanded(false);
        lastScrollY.current = currentScrollY;
      } else if (distance < -directionThreshold) {
        setIsExpanded(true);
        lastScrollY.current = currentScrollY;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky left-0 top-0 z-50 px-3 py-3 sm:px-6">
      <div
        className={`relative mx-auto grid min-h-14 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 border border-border/70 bg-background/85 px-4 py-2 backdrop-blur-2xl transition-[max-width,border-radius,min-height,padding,box-shadow] duration-300 motion-reduce:transition-none sm:grid-cols-[auto_1fr_auto] ${
          isExpanded
            ? "rounded-2xl shadow-[0_18px_60px_-38px_rgba(15,23,42,0.75)] sm:px-5"
            : "rounded-2xl shadow-[0_16px_45px_-28px_rgba(15,23,42,0.8)] sm:min-h-12 sm:max-w-4xl sm:rounded-full sm:px-3"
        }`}
      >
        <div className="flex min-w-0 items-center gap-4">
          <Logo />
          <div
            className={`min-w-0 border-s border-border/70 ps-4 transition-opacity duration-200 motion-reduce:transition-none ${
              isExpanded ? "hidden lg:block" : "hidden"
            }`}
          >
            <p className="truncate font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              {dictionary.footer.location}
            </p>
          </div>
        </div>
        <div className="hidden justify-self-center sm:block">
          <Navs dictionary={dictionary.navigation} />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1">
          <div className="hidden sm:block">
            <RobotFollowToggle dictionary={dictionary.robotControls} compact />
          </div>
          <LanguageSwitcher controls={dictionary.controls} languages={dictionary.languages} />
          <ModeToggle label={dictionary.controls.toggleTheme} />
          <div className="sm:hidden">
            <MobileDrawer dictionary={dictionary} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
