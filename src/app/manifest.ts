import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mainland Dispatch",
    short_name: "Dispatch",
    description:
      "Context-rich reporting and source comparison across China and the United States.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f0e8",
    theme_color: "#17201d",
  };
}
