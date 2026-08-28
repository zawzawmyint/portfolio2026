import BlogsFallback from "@/components/fallback/BlogsFallback";
import EditorialHero from "@/components/generic/EditorialHero";
import BaseContainer from "@/components/global/base-container/BaseContainer";
import Blogs from "@/components/pages/blogs/Blogs";
import { getDictionary, Locale } from "@/lib/dictionaries/dictionaries";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <EditorialHero
        variant="blogs"
        index="04"
        eyebrow={dict.common.navigation.blogs}
        title={dict.blogs.mainTitleDesc.title}
        description={dict.blogs.mainTitleDesc.desc}
        videoSrc="https://www.pexels.com/download/video/3476248/"
        poster="/images/amazing.png"
        meta={[dict.common.navigation.blogs, dict.common.actions.readMore, "Medium"]}
      />
      <BaseContainer>
        {" "}
        <Suspense key={"blogs"} fallback={<BlogsFallback />}>
          <Blogs dictionary={dict.blogs} readMoreLabel={dict.common.actions.readMore} />
        </Suspense>
      </BaseContainer>
    </>
  );
}
