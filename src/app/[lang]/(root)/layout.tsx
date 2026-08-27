import Footer from "@/components/global/footer/Footer";
import Header from "@/components/global/header/Header";
import { getDictionary, Locale } from "@/lib/dictionaries/dictionaries";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div>
      <Header dictionary={dictionary.common} />
      {children}
      <Footer dictionary={dictionary.common.footer} />
    </div>
  );
}
