import { Reveal } from "./reveal";

export type TimelineItem = {
  title: string;
  eyebrow?: string;
  content: React.ReactNode;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[0.3rem] top-2 w-1 rounded-full bg-gradient-to-b from-slate-400 via-slate-600 to-transparent shadow-[inset_1px_0_1px_rgba(255,255,255,0.5),2px_0_4px_rgba(0,0,0,0.35)] md:left-[11.35rem] rtl:left-auto rtl:right-[0.3rem] rtl:md:right-[11.35rem]" />
      <div className="space-y-10">
        {items.map((item, index) => (
          <div className="relative grid gap-5 pl-8 md:grid-cols-[10rem_1fr] md:gap-8 md:pl-0 rtl:pl-0 rtl:pr-8 rtl:md:pr-0" key={`${item.title}-${index}`}>
            <div className="skeuo-control absolute left-0 top-2 size-4 rounded-full bg-indigo-500 shadow-[0_0_22px_rgba(99,102,241,0.75)] md:left-[11.05rem] rtl:left-auto rtl:right-0 rtl:md:right-[11.05rem]" />
            <Reveal className="md:sticky md:top-28 md:h-fit md:text-right rtl:md:text-left">
              {item.eyebrow && (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300" dir="auto">
                  {item.eyebrow}
                </p>
              )}
              <h3 className="mt-1 text-xl font-semibold" dir="auto">{item.title}</h3>
            </Reveal>
            <Reveal className="md:col-start-2" delay={0.08}>
              {item.content}
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
