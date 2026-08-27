import React from "react";
import type { Dictionary } from "@/lib/dictionaries/types";

const Licensed = ({ dictionary }: { dictionary: Dictionary["common"]["footer"] }) => {
  return (
    <p className="opacity-50 text-sm">
      © 2026 — Zack. {dictionary.rights}
    </p>
  );
};

export default Licensed;
