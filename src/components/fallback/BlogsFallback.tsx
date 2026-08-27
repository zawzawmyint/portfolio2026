import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BlogsFallback = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading blog posts">
      {[1, 2, 3].map((item, i) => (
        <Card key={item + i} className="overflow-hidden rounded-2xl border-border/70 p-0">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-4 p-6">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BlogsFallback;
