import TitlevsTools from "@/components/generic/TitlevsTools";
import React from "react";
import db from "../../../../_data/db.json";
import Experiences from "./Experiences";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Tool } from "@/lib/types/definitions";

const About = ({ dictionary }: { dictionary: Dictionary["about"] }) => {
  const levelLabels: Record<string, string> = {
    Advanced: dictionary.levels.advanced,
    Intermediate: dictionary.levels.intermediate,
    Basic: dictionary.levels.basic,
    Mobile: dictionary.levels.mobile,
    Auth: dictionary.levels.auth,
    Containerization: dictionary.levels.containerization,
  };
  const localizeLevels = (tools: Tool[]) =>
    tools.map((tool) => ({ ...tool, level: levelLabels[tool.level] ?? tool.level }));

  return (
    <div className="space-y-16 sm:space-y-24">
      <TitlevsTools
        title={dictionary.sections.languages}
        tools={localizeLevels(db.skills.languages)}
        robotGuide="aboutSkills"
      />
      <TitlevsTools
        title={dictionary.sections.frontend}
        tools={localizeLevels(db.skills["frontend-developments"])}
      />
      <TitlevsTools
        title={dictionary.sections.backend}
        tools={localizeLevels(db.skills["backend-developments"])}
      />
      <TitlevsTools
        title={dictionary.sections.authentication}
        tools={localizeLevels(db.skills["authentications"])}
      />
      <TitlevsTools title={dictionary.sections.others} tools={localizeLevels(db.skills.others)} />
      <Experiences dictionary={dictionary.sections} experiences={db.workexperiences} />
    </div>
  );
};

export default About;
