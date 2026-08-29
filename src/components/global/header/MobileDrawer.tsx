"use client";

import { Mail, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/generic/Logo";
import { Button } from "@/components/ui/button";
import { EditorialArrow } from "@/components/ui/EditorialArrow";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Dictionary } from "@/lib/dictionaries/types";
import { ModeToggle } from "../modetoggle/ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Navs } from "./Navs";
import Socials from "./Socials";

export function MobileDrawer({ dictionary }: { dictionary: Dictionary["common"] }) {
  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button aria-label={dictionary.navigation.open} size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[min(92dvh,52rem)] overflow-hidden rounded-t-[2rem] border-border/70 bg-background/95 p-0 shadow-[0_-30px_90px_-45px_rgba(15,23,42,0.8)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,hsl(var(--border)/0.32)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.24)_1px,transparent_1px)] [background-size:3.5rem_3.5rem] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <DrawerTitle className="text-base">
              <Logo />
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {dictionary.navigation.description}
            </DrawerDescription>
            <DrawerClose asChild>
              <Button
                aria-label={dictionary.navigation.close}
                className="size-10 rounded-full"
                variant="outline"
                size="icon"
              >
                <XIcon size={24} />
              </Button>
            </DrawerClose>
          </div>

          <div className="flex items-center justify-between gap-4 py-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
              {dictionary.footer.location}
            </span>
            <span dir="ltr">Portfolio · 2026</span>
          </div>

          <Navs
            dictionary={dictionary.navigation}
            onNavigate={closeDrawer}
            variant="drawer"
          />

          <div className="mt-auto pt-6">
            <Link
              href="mailto:cuzawzawmyint@gmail.com"
              onClick={closeDrawer}
              className="group/link flex min-h-16 items-center gap-4 rounded-2xl bg-foreground px-5 font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Mail className="size-5" />
              <span className="min-w-0 flex-1 truncate">cuzawzawmyint@gmail.com</span>
              <EditorialArrow className="size-5" />
            </Link>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
              <Socials />
              <div className="flex items-center gap-2">
                <LanguageSwitcher
                  controls={dictionary.controls}
                  languages={dictionary.languages}
                />
                <ModeToggle label={dictionary.controls.toggleTheme} />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
