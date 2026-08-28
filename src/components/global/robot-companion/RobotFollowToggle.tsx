"use client";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries/types";
import { Bot, MousePointer2, Pin } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  setRobotFollowing,
  useHasFinePointer,
  useRobotFollowing,
} from "./robot-preference";

type RobotControlDictionary = Dictionary["common"]["robotControls"];

export default function RobotFollowToggle({
  dictionary,
  compact = false,
}: {
  dictionary: RobotControlDictionary;
  compact?: boolean;
}) {
  const preferenceAllowsFollowing = useRobotFollowing();
  const hasFinePointer = useHasFinePointer();
  const reduceMotion = useReducedMotion();
  const isFollowing = preferenceAllowsFollowing && !reduceMotion;
  const label = reduceMotion
    ? dictionary.reducedMotion
    : isFollowing
      ? dictionary.dock
      : dictionary.follow;

  if (!hasFinePointer) return null;

  return (
    <Button
      type="button"
      size={compact ? "icon" : "default"}
      variant={isFollowing ? "secondary" : "outline"}
      aria-label={label}
      aria-pressed={isFollowing}
      title={label}
      disabled={Boolean(reduceMotion)}
      className={compact ? "relative" : "w-full justify-center"}
      onClick={() => setRobotFollowing(!preferenceAllowsFollowing)}
    >
      {compact ? <Bot /> : isFollowing ? <MousePointer2 /> : <Pin />}
      {!compact && (isFollowing ? dictionary.following : dictionary.docked)}
      {compact && (
        <span
          aria-hidden="true"
          className={`absolute bottom-1 end-1 size-2 rounded-full ring-2 ring-background ${
            isFollowing ? "bg-cyan-400" : "bg-amber-400"
          }`}
        />
      )}
    </Button>
  );
}
