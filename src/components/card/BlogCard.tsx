import type { Blog } from "@/lib/types/definitions";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/aceternity/reveal";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { EditorialArrow } from "../ui/EditorialArrow";

const BlogCard = ({
  blog,
  coverLabel,
  readMoreLabel,
  featured = false,
  index,
  articleLabel,
}: {
  blog: Blog;
  coverLabel: string;
  readMoreLabel: string;
  featured?: boolean;
  index: number;
  articleLabel: string;
}) => {
  return (
    <Reveal>
      <article className={cn("group grid overflow-hidden border-b border-border/70 py-6", featured ? "gap-6 rounded-[1.75rem] border border-border/70 bg-background/70 p-3 lg:grid-cols-[1.2fr_0.8fr] lg:p-3" : "gap-5 sm:grid-cols-[11rem_1fr_auto] sm:items-center")}>
        <Link
          href={blog.link}
          target="_blank"
          rel="noreferrer"
          className={cn("group/image relative block overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400", featured ? "min-h-[23rem]" : "aspect-[4/3]")}
        >
          <Image
            src={blog.image}
            alt={coverLabel.replace("{title}", blog.title)}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "176px"}
            className="object-cover transition duration-700 ease-out group-hover/image:scale-105 motion-reduce:transition-none motion-reduce:group-hover/image:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          <span className="absolute end-4 top-4 grid size-10 place-items-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md">
            <EditorialArrow className="size-4" interactionGroup="image" />
          </span>
        </Link>

        <div className={cn("flex flex-1 flex-col justify-center", featured ? "p-5 sm:p-8 lg:p-10" : "py-2")}>
          <span className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{articleLabel} / {String(index + 1).padStart(2, "0")}</span>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
            {blog.date}
          </p>
          <h2 className={cn("font-semibold leading-snug tracking-tight", featured ? "text-3xl sm:text-4xl" : "text-xl")}>
            <Link className="hover:text-indigo-500" href={blog.link} target="_blank" rel="noreferrer">
              {blog.title}
            </Link>
          </h2>
          <p className={cn("mt-4 flex-1 text-sm leading-7 text-muted-foreground", !featured && "line-clamp-2")}>
            {blog.description}{" "}
            <Link className="font-medium text-foreground underline decoration-indigo-400/60 underline-offset-4" href={blog.link} target="_blank" rel="noreferrer">
              {readMoreLabel}
            </Link>
          </p>
          <div className="mt-5 flex flex-wrap gap-2 pt-1">
            {blog.tags.map((tag, index) => (
              <Badge className="rounded-full" key={`${tag}-${index}`} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {!featured && (
          <EditorialArrow
            className="hidden size-5 text-muted-foreground sm:block"
            interactionGroup="none"
          />
        )}
      </article>
    </Reveal>
  );
};

export default BlogCard;
