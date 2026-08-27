import BlogsFallback from "@/components/fallback/BlogsFallback";
import MainTitleDesc from "@/components/generic/MainTitleDesc";
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
      <MainTitleDesc
        title={dict.blogs.mainTitleDesc.title}
        desc={dict.blogs.mainTitleDesc.desc}
        url="https://www.pexels.com/download/video/3476248/"
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
