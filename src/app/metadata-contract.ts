export const mainlandIconSizes = {
  favicon: 64,
  small: 48,
  large: 192,
  app: 512,
  apple: 180,
} as const;

export const mainlandManifestIcons = [
  { src: "/icon0", sizes: "48x48", type: "image/png" },
  { src: "/icon1", sizes: "192x192", type: "image/png" },
  { src: "/icon2", sizes: "512x512", type: "image/png" },
  {
    src: "/apple-icon",
    sizes: "180x180",
    type: "image/png",
    purpose: "any",
  },
] as const;
