import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zaw Zaw Myint Portfolio",
    short_name: "ZZM PFL",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
