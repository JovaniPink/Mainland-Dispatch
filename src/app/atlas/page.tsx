import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Evidence Atlas not published",
  robots: { index: false, follow: false, noarchive: true },
};

/**
 * Atlas releases remain local prototype/source-snapshot fixtures. Restoring a
 * public route requires a separate editorial review and an explicit route
 * change; changing a content status alone cannot publish them accidentally.
 */
export default function AtlasPage() {
  notFound();
}
