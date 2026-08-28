"use client";

import * as React from "react";

const STORAGE_KEY = "portfolio:robot-following";
const CHANGE_EVENT = "portfolio:robot-following-change";

const subscribeToFinePointer = (onChange: () => void) => {
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

const getFinePointerSnapshot = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

const getSnapshot = () => window.localStorage.getItem(STORAGE_KEY) !== "false";

export const useRobotFollowing = () =>
  React.useSyncExternalStore(subscribe, getSnapshot, () => true);

export const useHasFinePointer = () =>
  React.useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    () => false,
  );

export const setRobotFollowing = (following: boolean) => {
  window.localStorage.setItem(STORAGE_KEY, String(following));
  window.dispatchEvent(new Event(CHANGE_EVENT));
};
