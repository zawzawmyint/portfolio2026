import React from "react";
import { CardTitle } from "../ui/card";

const SectionTitle = ({ title }: { title: string }) => {
  return <CardTitle className="text-xl font-semibold">{title}</CardTitle>;
};

export default SectionTitle;
