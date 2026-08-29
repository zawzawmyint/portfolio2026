import TitlevsTools from "@/components/generic/TitlevsTools";
import React from "react";
import db from "../../../../_data/db.json";
import Experiences from "./Experiences";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Tool } from "@/lib/types/definitions";

const About = ({ dictionary, introduction }: { dictionary: Dictionary["about"]; introduction: string[] }) => {
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
      <section className="grid gap-8 border-y border-border/70 py-10 lg:grid-cols-[0.55fr_1.45fr] lg:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand">01 · {dictionary.sections.career}</p>
        <div><h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">{introduction[0]}</h2><div className="mt-7 grid gap-5 text-base leading-8 text-muted-foreground md:grid-cols-2">{introduction.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
      </section>
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
