import BlogCard from "@/components/card/BlogCard";
import { getBlogs } from "@/lib/data/blogs/blogsData";
import { Blog } from "@/lib/types/definitions";
import React from "react";
import type { Dictionary } from "@/lib/dictionaries/types";

const Blogs = async ({
  dictionary,
  readMoreLabel,
}: {
  dictionary: Dictionary["blogs"];
  readMoreLabel: string;
}) => {
  const data = await getBlogs();

  return (
    <div
      data-robot-guide="blogsCollection"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {data.dataMedium.map((blog: Blog, i: number) => (
        <BlogCard
          key={blog.title + i}
          blog={blog}
          coverLabel={dictionary.coverLabel}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  );
};

export default Blogs;
