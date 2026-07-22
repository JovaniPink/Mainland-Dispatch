import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: "Mainland Dispatch",
    description: site.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f3f0e8",
    theme_color: "#17201d",
    lang: "en-US",
    categories: ["news", "magazines", "education"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
