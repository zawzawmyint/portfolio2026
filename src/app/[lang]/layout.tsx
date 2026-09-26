import ReactScrollToTop from "@/components/global/react-scroll-to-top/ReactScrollToTop";
import { DesignStyleBoot } from "@/components/theme/DesignStyleBoot";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { designStyleBootScript } from "@/lib/styles/registry";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoading from "@/components/generic/NextTopLoading";
import { LocaleDetector } from "@/components/local-detector/LocalDetector";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zaw Zaw Myint (zack)",
  description: "Zaw Zaw Myint (zack), portfolio2026",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} dir={lang === "ar-SA" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased w-full min-h-screen`}
      >
        <script dangerouslySetInnerHTML={{ __html: designStyleBootScript }} />
        <DesignStyleBoot />
        {/*language detected depend on user location */}
        <LocaleDetector />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextTopLoading />
          {children}
          <ReactScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
