import type { Blog } from "@/lib/types/definitions";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "../ui/aceternity/card-spotlight";
import { Reveal } from "../ui/aceternity/reveal";
import { Badge } from "../ui/badge";

const BlogCard = ({
  blog,
  coverLabel,
  readMoreLabel,
}: {
  blog: Blog;
  coverLabel: string;
  readMoreLabel: string;
}) => {
  return (
    <Reveal className="h-full">
      <CardSpotlight className="flex h-full flex-col transition duration-500 hover:-translate-y-1">
        <Link
          href={blog.link}
          target="_blank"
          rel="noreferrer"
          className="skeuo-screen group/image relative block aspect-[4/3] overflow-hidden rounded-t-2xl border-x-0 border-t-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400"
        >
          <Image
            src={blog.image}
            alt={coverLabel.replace("{title}", blog.title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover/image:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md transition group-hover/image:rotate-6 group-hover/image:scale-105">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>

        <div className="skeuo-inset m-2 mt-0 flex flex-1 flex-col space-y-4 rounded-b-xl p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
            {blog.date}
          </p>
          <h2 className="text-xl font-semibold leading-snug tracking-tight">
            <Link className="hover:text-indigo-500" href={blog.link} target="_blank" rel="noreferrer">
              {blog.title}
            </Link>
          </h2>
          <p className="flex-1 text-sm leading-7 text-muted-foreground">
            {blog.description}{" "}
            <Link className="font-medium text-foreground underline decoration-indigo-400/60 underline-offset-4" href={blog.link} target="_blank" rel="noreferrer">
              {readMoreLabel}
            </Link>
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {blog.tags.map((tag, index) => (
              <Badge className="rounded-full" key={`${tag}-${index}`} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardSpotlight>
    </Reveal>
  );
};

export default BlogCard;
