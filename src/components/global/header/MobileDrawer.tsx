"use client";

import { MenuIcon, XIcon } from "lucide-react";

import Logo from "@/components/generic/Logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BuildTools from "../footer/BuildTools";
import { Navs } from "./Navs";
import Socials from "./Socials";
import type { Dictionary } from "@/lib/dictionaries/types";
import RobotFollowToggle from "../robot-companion/RobotFollowToggle";

export function MobileDrawer({ dictionary }: { dictionary: Dictionary["common"] }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button aria-label={dictionary.navigation.open} size={"icon"} variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="skeuo-panel rounded-t-3xl backdrop-blur-2xl">
        <div className="mr-6 flex justify-end">
          <DrawerClose asChild>
            <Button aria-label={dictionary.navigation.close} className="rounded-xl" variant={"outline"} size={"icon"}>
              <XIcon size={"24"} />
            </Button>
          </DrawerClose>
        </div>
        <div className="mx-auto -mt-2 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              <div className="grid place-items-center">
                <Logo />
              </div>
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {dictionary.navigation.description}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 py-4">
            <div className="grid place-items-center">
              <Navs dictionary={dictionary.navigation} />
            </div>
          </div>
          <DrawerFooter className="items-center gap-4 pb-7">
            <RobotFollowToggle dictionary={dictionary.robotControls} />
            <Socials />
            <BuildTools dictionary={dictionary.footer} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
