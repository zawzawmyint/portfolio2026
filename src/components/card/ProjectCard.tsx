import type { Project } from "@/lib/types/definitions";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "../ui/aceternity/card-spotlight";
import { Reveal } from "../ui/aceternity/reveal";
import { ThreeDCard } from "../ui/aceternity/three-d-card";
import { Badge } from "../ui/badge";
import type { Dictionary } from "@/lib/dictionaries/types";

const ProjectCard = ({
  project,
  labels,
}: {
  project: Project;
  labels: Dictionary["projects"];
}) => {
  const formatLabel = (template: string) => template.replace("{name}", project.name);

  return (
    <Reveal className="h-full">
      <ThreeDCard>
        <CardSpotlight className="flex h-full flex-col overflow-hidden">
          <div className="skeuo-screen relative aspect-[16/10] overflow-hidden rounded-t-2xl border-x-0 border-t-0">
            <Image
              src={project.image}
              alt={formatLabel(labels.previewLabel)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <h2 className="text-balance text-2xl font-semibold text-white drop-shadow-lg">
                {project.name}
              </h2>
              <div className="flex shrink-0 gap-2">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={formatLabel(labels.sourceLabel)}
                    className="grid size-10 place-items-center rounded-full border border-white/20 bg-slate-950/45 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <Github className="size-4" />
                  </Link>
                )}
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={formatLabel(labels.demoLabel)}
                    className="grid size-10 place-items-center rounded-full border border-white/20 bg-white text-slate-950 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="skeuo-inset m-2 mt-0 flex flex-1 flex-col rounded-b-xl p-5 sm:p-6">
            <p className="flex-1 text-sm leading-7 text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stacks.map((stack, index) => (
                <Badge
                  className="rounded-full bg-background/60"
                  key={`${stack}-${index}`}
                  variant="outline"
                >
                  {stack}
                </Badge>
              ))}
            </div>
          </div>
        </CardSpotlight>
      </ThreeDCard>
    </Reveal>
  );
};

export default ProjectCard;
