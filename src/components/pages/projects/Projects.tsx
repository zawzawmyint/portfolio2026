import ProjectCard from "@/components/card/ProjectCard";
import db from "../../../../_data/db.json";
import type { Dictionary } from "@/lib/dictionaries/types";

const Projects = ({ dictionary }: { dictionary: Dictionary["projects"] }) => {
  return (
    <div
      id="projects-grid"
      data-robot-guide="projectsGallery"
      className="space-y-8"
    >
      {db.projects.map((proj, i) => {
        const description = dictionary.descriptions[
          proj.name as keyof typeof dictionary.descriptions
        ] ?? proj.description;

        return (
          <ProjectCard
            key={i + proj.name}
            project={{ ...proj, description }}
            labels={dictionary}
            index={i}
          />
        );
      })}
    </div>
  );
};

export default Projects;
